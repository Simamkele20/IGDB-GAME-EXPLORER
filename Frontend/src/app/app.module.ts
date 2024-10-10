import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/Pages/home/home.component';
import { AppRoutingModule } from './app-routing.module' // Make sure the path is correct

@NgModule({

  imports: [
    HomeComponent,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    HeaderComponent,
    AppRoutingModule // Import standalone component
  ],
  providers: []
})
export class AppModule {}
