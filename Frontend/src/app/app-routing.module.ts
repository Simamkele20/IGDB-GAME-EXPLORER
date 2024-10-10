import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/Pages/home/home.component';

const routes: Routes = [
  {path: 'games', component:HomeComponent},
  {path: 'search/', component:HomeComponent}
];


@NgModule({
  declarations: [],
  imports: [CommonModule, [RouterModule.forRoot(routes)]],
})
export class AppRoutingModule {}
