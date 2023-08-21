import { Routes } from "@angular/router";
import { HomePage } from "./Home/home.page";
import { AuthPage } from "./Auth/auth.page";
import { RecurrencyListPage } from "./Recurrencies/recurrency-list.page";
import { TestPage } from "./_Testing/test.page";



const ROOT_PAGE = 'home'

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: ROOT_PAGE },
  { path: 'home', component: HomePage },
  { path: 'auth', component: AuthPage },
  { path: 'recurrency', component: RecurrencyListPage },
  { path: 'test', component: TestPage },
  { path: '**', pathMatch: 'full', redirectTo: ROOT_PAGE },
];
