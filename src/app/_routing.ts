import { Routes } from "@angular/router";
import { HomePage } from "./home.page";



export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomePage },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];
