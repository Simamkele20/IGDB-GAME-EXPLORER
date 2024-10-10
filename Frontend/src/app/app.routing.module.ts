import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes } from './app.routes'; // Import routes from app.routes

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Use forRoot() for the root module
  exports: [RouterModule] // Export RouterModule so it can be used in other modules
})
export class AppRoutingModule { }
