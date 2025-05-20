import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, Subscriber, Observer } from 'rxjs';

import { HistoryWindow } from '../shared/history-window/history-window';

@Component({
  templateUrl: './exercise-creating.html',
  imports: [HistoryWindow]
})
export class ExerciseCreating {

  logStream$ = new ReplaySubject<unknown>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/


    // Producer: generiert die Daten
    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);
      sub.next(10);
      sub.next(20);
      sub.next(30);

      setTimeout(() => sub.next(100), 2000)
      setTimeout(() => sub.next(400), 4000)
      setTimeout(() => sub.complete(), 6000)
    }

    // Observer: hört von außen zu
    const obs: Observer<number> = {
      next: value => console.log(value),
      error: (err: any) => console.error(err),
      complete: () => console.log('FERTIG')
    }

    // producer(obs);
    // Observable: Schnittstelle zwischen Producer und Observer
    // $ Finnische Notation
    const myObs$ = new Observable(producer);

    myObs$.subscribe(obs);
    myObs$.subscribe(obs);
    myObs$.subscribe(obs);


    function httpGetReq(url: string) {
      return new Observable(sub => {
        fetch(url)
          .then(res => res.json())
          .then(data => {
            sub.next(data);
          })
      })
    }

    /******************************/
  }

  log(msg: unknown) {
    this.logStream$.next(msg);
  }

  async getData() {
    const data = await fetch('https://api.angular.schule');
    console.log(data);


    fetch('https://api.angular.schule').then(data => console.log(data));
  }

}
