import { Routes } from "@angular/router";
import { TestPage } from "./_Testing/test.page";
import { HomePage } from "./Home/home.page";
import { RecurrenciesListPage } from "./Recurrencies/recurrencies-list.page";
import { AuthPage } from "./Auth/auth.page";



const ROOT_PAGE = 'home'

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: ROOT_PAGE },
  { path: 'home', component: HomePage },
  { path: 'auth', component: AuthPage },
  { path: 'recurrencies', component: RecurrenciesListPage },
  { path: 'test', component: TestPage },
  { path: '**', pathMatch: 'full', redirectTo: ROOT_PAGE },
];
