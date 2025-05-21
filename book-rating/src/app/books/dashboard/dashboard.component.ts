import { Component, inject, OnDestroy, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookComponent } from "../book/book.component";
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [BookComponent, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnDestroy {
  readonly books = signal<Book[]>([]);

  #rs = inject(BookRatingService);
  #bs = inject(BookStoreService);

  readonly myDate = signal(Date.now());
  #interval = setInterval(() => this.myDate.set(Date.now()), 1000);

  // readonly booksResource = this.#bs.getAllResource();

  constructor() {
    this.#bs.getAll().subscribe({
      next: receivedBooks => {
        this.books.set(receivedBooks);
      },
      error: (err: HttpErrorResponse) => {
        console.log('ERROR', err);
      }
    });
  }

  doRateUp(book: Book) {
    const ratedBook = this.#rs.rateUp(book);
    this.#updateList(ratedBook);
  }


  doRateDown(book: Book) {
    const ratedBook = this.#rs.rateDown(book);
    this.#updateList(ratedBook);
  }

  doDelete(book: Book) {
    if (!confirm('Buch löschen?')) {
      return;
    }

    this.#bs.delete(book.isbn).subscribe(() => {
      /*this.#bs.getAll().subscribe(receivedBooks => {
        this.books.set(receivedBooks);
      });*/
      // alternativ: Liste lokal filtern
      this.books.update(oldList => oldList.filter(b => b.isbn !== book.isbn));
    });
  }

  #updateList(ratedBook: Book) {
    this.books.update(oldList => {
      // [1,2,3,4,5].map(e => e * 10) // [10, 20, 30, 40, 50]
      // [1,2,3,4,5,6,7,8,9].filter(e => e > 5) // [6,7,8,9]

      // const newList = oldList.filter(b => b.isbn !== ratedBook.isbn);
      // newList.push(ratedBook);
      // return newList;

      return oldList.map(b => {
        if (b.isbn === ratedBook.isbn) {
          return ratedBook;
        } else {
          return b;
        }
      });
    });
  }

  ngOnDestroy() {
    clearInterval(this.#interval);
  }
}
