import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BookDetailsComponent } from "./book-details/book-details.component";

export const booksRoutes: Routes = [
  { path: '', component: DashboardComponent, title: 'Dashboard' },
  { path: ':isbn', component: BookDetailsComponent, title: 'Details' }
];
