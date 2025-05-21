import { Component, inject } from '@angular/core';
import { ReplaySubject, throwError, of, EMPTY, retry, catchError, tap } from 'rxjs';

import { HistoryWindow } from '../shared/history-window/history-window';
import { DataService } from './data.service';

@Component({
  templateUrl: './exercise-errorhandling.html',
  imports: [HistoryWindow]
})
export class ExerciseErrorhandling {

  logStream$ = new ReplaySubject<unknown>();
  #ds = inject(DataService);

  /**
   * Das Observable aus `this.ds.getData()` liefert Daten – oder mit hoher Wahrscheinlichkeit einen Fehler.
   * Probiere verschiedene Strategien aus, um den Fehler zu behandeln.
   */

  start() {
    this.#ds.getData().pipe(
      tap({
        error: err => console.log('TAP ERROR', err)
      }),
      catchError(err => {
        // mit dem Fehler arbeiten
        console.log('FEHLER:', err);

        // Fehler weiterwerfen
        // return throwError(() => 'FEHLER FEHLER!');
        throw 'BÖSER FEHLER!';

        // Fehler ignorieren/verschlucken
        // return of();
        // return EMPTY;

        // Fehler ersetzen
        // return of('Nichts', 'passiert');
      })
    ).subscribe({
      next: e => this.logStream$.next(e),
      error: err => this.logStream$.next('❌ ERROR: ' + err),
      complete: () => this.logStream$.next('🏁 COMPLETE')
    });
  }
}
