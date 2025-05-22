import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, switchMap } from 'rxjs';
import { BookStoreService } from '../shared/book-store.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-book-search',
  imports: [ReactiveFormsModule],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.scss'
})
export class BookSearchComponent {
  #bs = inject(BookStoreService);

  searchControl = new FormControl('', { nonNullable: true });

  readonly books = toSignal(this.searchControl.valueChanges.pipe(
    debounceTime(300),
    filter(term => term.length >= 3),
    switchMap(term => this.#bs.search(term))
  ), { initialValue: [] });
}
