import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book } from './book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  #http = inject(HttpClient);
  #apiUrl = 'https://api.angular.schule';

  constructor() { }

  getAll(): Observable<Book[]> {
    return this.#http.get<Book[]>(this.#apiUrl + '/books');
  }

  getAllResource(): HttpResourceRef<Book[]> {
    return httpResource<Book[]>(this.#apiUrl + '/books', { defaultValue: [] });
  }

  getSingle(isbn: string): Observable<Book> {
    // return this.#http.get<Book>(this.#apiUrl + '/books/' + isbn);
    return this.#http.get<Book>(`${this.#apiUrl}/books/${isbn}`); // Template String
  }

  create(book: Book): Observable<Book> {
    return this.#http.post<Book>(this.#apiUrl + '/books', book);
  }

  search(term: string): Observable<Book[]> {
    return this.#http.get<Book[]>(this.#apiUrl + '/books/search/' + term);
  }

  delete(isbn: string): Observable<unknown> {
    return this.#http.delete(this.#apiUrl + '/books/' + isbn);
  }
}
