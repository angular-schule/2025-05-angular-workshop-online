import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'app-book-details',
  imports: [RouterLink],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  #route = inject(ActivatedRoute);
  #bs = inject(BookStoreService);

  readonly book = signal<Book | undefined>(undefined);

  constructor() {
    // Pull
    // const isbn = this.#route.snapshot.paramMap.get('isbn'); // path: 'books/:isbn'
    // console.log(isbn);

    // Push
    this.#route.paramMap.subscribe(params => {
      const isbn = params.get('isbn')!; // Non-Null Assertion – gefährlich!

      this.#bs.getSingle(isbn).subscribe(receivedBook => {
        this.book.set(receivedBook);
      });
    });
  }
}


/*
- ISBN aus der URL auslesen
- HTTP für das Buch
- Anzeigen
*/
