import { Routes } from '@angular/router';
import { HomeComponent } from './components/Pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/games', pathMatch: 'full' },
  { path: 'games', component: HomeComponent },
  { path: 'search', component: HomeComponent },
  { path: '**', redirectTo: '/games' },
];
