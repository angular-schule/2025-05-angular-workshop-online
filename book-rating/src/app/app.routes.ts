import { Routes } from '@angular/router';
import { booksRoutes } from './books/books.routes';
import { ErrorPageComponent } from './error-page/error-page.component';

export const routes: Routes = [
  // bei Weiterleitung vom leeren Pfad:
  // (fast) immer pathMatch:full nötig
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  ...booksRoutes,
  { path: '**', component: ErrorPageComponent }
];
