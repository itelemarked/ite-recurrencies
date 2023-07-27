import { Routes } from "@angular/router";
import { HomePage } from "./pages/home.page";
import { TestPage } from "./pages/_test.page";



export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomePage },
  { path: 'test', component: TestPage },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];
