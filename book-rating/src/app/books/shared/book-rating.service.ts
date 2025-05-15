import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  constructor() {console.log('HALLO')}

  rateUp(book: Book): Book {
    return {
      ...book,
      rating: book.rating < 5 ? book.rating + 1 : 5
    }
  }

  rateDown(book: Book): Book {
    if (book.rating === 1) {
      return book;
    }

    return {
      ...book,
      rating: book.rating - 1
    };
  }
}
