import { Routes } from '@angular/router';
// import { booksRoutes } from './books/books.routes';
import { ErrorPageComponent } from './error-page/error-page.component';

export const routes: Routes = [
  // bei Weiterleitung vom leeren Pfad:
  // (fast) immer pathMatch:full nötig
  { path: '', redirectTo: 'books', pathMatch: 'full' },

  // ...booksRoutes,
  {
    path: 'books',
    loadChildren: () => import('./books/books.routes').then(m => m.booksRoutes)
  },

  // Wildcard-Route: matcht auf alles, muss immer ganz unten stehen!
  { path: '**', component: ErrorPageComponent },
];
