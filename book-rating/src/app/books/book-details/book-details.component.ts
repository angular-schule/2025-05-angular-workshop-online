import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { filter, map, Observable, share, switchMap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-book-details',
  imports: [RouterLink, AsyncPipe, JsonPipe],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  #route = inject(ActivatedRoute);
  #bs = inject(BookStoreService);

  book$ = this.#route.paramMap.pipe(
    map(params => params.get('isbn')),
    filter(isbn => isbn !== null),
    switchMap(isbn => this.#bs.getSingle(isbn))
  );
}


/*
- ISBN aus der URL auslesen
- HTTP für das Buch
- Anzeigen
*/
