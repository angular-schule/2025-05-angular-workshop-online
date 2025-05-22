import { Component, signal } from '@angular/core';
import { fromEvent, map, startWith, debounceTime, share } from 'rxjs';

@Component({
  templateUrl: './exercise-fromevent.html'
})
export class ExerciseFromevent {

  readonly currentWidth = signal(0);

  constructor() {
    /**
     * Schreibe die jeweils aktuelle Fensterbreite in das Property `this.currentWidth`.
     *
     * Nutze fromEvent, um das resize-Event auf window zu abonnieren.
     * Initialisiere das Observable mit der aktuellen Fensterbreite (`window.innerWidth`).
     * Entprelle den Eventstrom, damit nicht zu viele Events gefeuert werden.
     */

    /******************************/

    fromEvent<{ target: Window }>(window, 'resize').pipe(
      debounceTime(100),
      map(e => e.target.innerWidth),
      startWith(window.innerWidth),
    ).subscribe(e => {
      this.currentWidth.set(e)
    });

    //////////////////////////////////////

    const resizeEvents$ = fromEvent<{ target: Window }>(window, 'resize').pipe(
      debounceTime(100),
      startWith({ target: window }),
      share()
    );

    const innerWidth$ = resizeEvents$.pipe(
      map(e => e.target.innerWidth)
    );

    const outerWidth$ = resizeEvents$.pipe(
      map(e => e.target.outerWidth)
    );



    /******************************/
  }

}
