import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { of } from 'rxjs';
import { BookStoreService } from '../shared/book-store.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {

    const ratingMock = {
      rateUp: (b: Book) => b,
      rateDown: (b: Book) => b,
    };

    const storeMock = {
      getAll: () => of([] as Book[]) // Creation Function // of (1,2,3,4)
    };

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        // BRS ersetzen: Immer wenn jemand BRS anfordert,
        // wird stattdessen ratingMock ausgeliefert
        { provide: BookRatingService, useValue: ratingMock },
        { provide: BookStoreService, useValue: storeMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.rateUp for component.doRateUp', () => {
    // ARRANGE
    // Testbuch
    const testBook = { isbn: '124' } as Book;

    // Zugriff auf Service bzw. ratingMock
    const rs = TestBed.inject(BookRatingService);
    // Service überwachen
    // callThrough benutzt originale Methode trotzdem noch, um den Wert zu erzeugen
    // spyOn(rs, 'rateUp').and.returnValue(testBook);
    // spyOn(rs, 'rateUp').and.callFake(b => b);
    spyOn(rs, 'rateUp').and.callThrough();

    // ACT
    component.doRateUp(testBook);

    // ASSERT
    // prüfen, ob rateUp() aufgerufen wurde
    expect(rs.rateUp).toHaveBeenCalled();
    expect(rs.rateUp).toHaveBeenCalledOnceWith(testBook);
  });
});
