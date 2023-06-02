import { Routes } from "@angular/router";
import { HomePage } from "./home.page";
import { EditPage } from "./edit.page";



export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomePage },
  { path: 'edit/:id', component: EditPage },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];
