import { Component, signal } from '@angular/core';
import { Subject, ReplaySubject, scan, reduce, startWith, of } from 'rxjs';

import { HistoryWindow } from '../shared/history-window/history-window';

@Component({
  templateUrl: './exercise-gamescore.html',
  imports: [HistoryWindow]
})
export class ExerciseGamescore {

  logStream$ = new ReplaySubject<unknown>();
  readonly score$ = new Subject<number>();

  readonly currentScore = signal(0);
  readonly finalScore = signal<number | undefined>(undefined);

  constructor() {
    /**
     * Wir entwickeln ein spannendes Browser-Spiel!
     * Jetzt fehlt nur noch der Code, um den Punktestand zu ermitteln ...
     */

    /******************************/

    this.score$.pipe(
      startWith(0),
      scan((acc, item) => acc + item, 0)
    ).subscribe(score => {
      this.currentScore.set(score);
    });


    this.score$.pipe(
      startWith(0),
      reduce((acc, item) => acc + item, 0)
    ).subscribe(score => {
      this.finalScore.set(score);
    });



    /******************************/


    of(
      /*{ name: 'Klaus', framework: 'Vue.js' },
      { city: 'Leipzig' },
      { city: 'Köln', name: 'Lisa' },
      { framework: 'Angular' },
      { city: 'Berlin' },*/
      'SETFRANG',
      'SETCITYBERLIN',
      'SETNAMELISA',
      'UNKNOWN',
      'SETNAMEKLAUS',
      'SETFRVUE',
      // { type: 'SETFRAMEWORK', data: 'Vue.js' }
      // { type: 'SETFRAMEWORK', data: 'Angular' }
    ).pipe(
      scan((acc, item) => {
        // { ...acc, ...item }
        switch (item) {
          case 'SETNAMELISA': return { ...acc, name: 'Lisa', city: 'Leipzig' };
          case 'SETCITYBERLIN': return { ...acc, city: 'Berlin' };
          case 'SETNAMEKLAUS': return { ...acc, name: 'Klaus', city: 'Köln' };
          case 'SETFRVUE': return { ...acc, framework: 'Vue.js' };
          case 'SETFRANG': return { ...acc, framework: 'Angular' };
          case 'SETFRREACT': return { ...acc, framework: 'React' };
          default: return acc;
        }
      }, {})
    ).subscribe(e => console.log(e))


    /******************************/

    this.score$.subscribe({
      next: e => this.logStream$.next(e),
      complete: () => this.logStream$.next('✅ COMPLETE')
    });
  }

  finishGame() {
    this.score$.complete();
  }

  addScore(amount: number) {
    this.score$.next(amount);
  }

}
