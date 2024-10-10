import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component'; 
import { HeaderComponent } from './components/partials/header/header.component'

@NgModule({
  imports: [
    BrowserModule,
    AppComponent, 
    HeaderComponent,
    HttpClientModule,
  ],
  providers: [],
})
export class AppModule {}
