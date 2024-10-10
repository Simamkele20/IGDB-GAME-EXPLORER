import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/Pages/home/home.component'; // Adjust the path as necessary

const routes: Routes = [
  { path: '', redirectTo: '/games', pathMatch: 'full' }, // Redirect to home on empty path
  { path: 'games', component: HomeComponent },
  
  // Add more routes as necessary
  { path: '**', redirectTo: '/games' } // Wildcard route for a 404 page, redirecting to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Use forRoot() for the root module
  exports: [RouterModule] // Export RouterModule so it can be used in other modules
})
export class AppRoutingModule { }
