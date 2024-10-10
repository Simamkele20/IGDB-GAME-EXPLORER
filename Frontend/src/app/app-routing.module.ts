import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/Pages/home/home.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'search/', component:HomeComponent}
];


@NgModule({
  imports: [CommonModule,
     [RouterModule.forRoot(routes)]],
  exports: [RouterModule]
})
export class AppRoutingModule {}
