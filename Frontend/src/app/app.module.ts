import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/Pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';


@NgModule({
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    AppComponent,
    HomeComponent,
    CommonModule,
    BrowserModule,
    HeaderComponent,
    AppRoutingModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
