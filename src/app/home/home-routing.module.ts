import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './wel-home/home.component';
import { WebHomeComponent } from './web-home/web-home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'web/:id', component: WebHomeComponent }

];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
