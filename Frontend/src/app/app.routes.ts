import { Routes } from '@angular/router';
import { HomeComponent } from './components/Pages/home/home.component'; // Adjust the path as necessary

export const routes: Routes = [
  { path: '', redirectTo: '/games', pathMatch: 'full' }, // Redirect to /games on empty path
  { path: 'games', component: HomeComponent },
  { path: '**', redirectTo: '/games' } // Wildcard route for a 404 page
];
