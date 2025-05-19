import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BookDetailsComponent } from "./book-details/book-details.component";
import { BookCreateComponent } from "./book-create/book-create.component";
import { BookSearchComponent } from "./book-search/book-search.component";

export const booksRoutes: Routes = [
  { path: '', component: DashboardComponent, title: 'Dashboard' },
  { path: 'create', component: BookCreateComponent, title: 'Create' },
  { path: 'search', component: BookSearchComponent, title: 'Search' },
  { path: ':isbn', component: BookDetailsComponent, title: 'Details' },
];
