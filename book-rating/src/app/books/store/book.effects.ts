import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of, interval } from 'rxjs';
import { BookActions } from './book.actions';
import { BookStoreService } from '../shared/book-store.service';

@Injectable()
export class BookEffects {

  actions$ = inject(Actions);
  #bs = inject(BookStoreService);

  /*interval$ = createEffect(() => {
    return interval(1000).pipe(
      map(i => {
        return { type: 'INTERVAL', data: i };
      })
    )
  })*/

  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.loadBooks),
      switchMap(() => this.#bs.getAll().pipe(
        map(books => BookActions.loadBooksSuccess({ data: books })),
        catchError(err => of(BookActions.loadBooksFailure({ error: err.message })))
      ))
    )
  })

    /*
    - wenn Action loadBooks kommt, dann
    - HTTP-Request getAll()
      - dann erzeuge Action success
      - bei Fehler: erzeuge Action failure

    */
}
