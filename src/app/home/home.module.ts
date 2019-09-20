import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './wel-home/home.component';
import { SharedModule } from '../shared/shared.module';
import { WebHomeComponent } from './web-home/web-home.component';

@NgModule({
  declarations: [HomeComponent, WebHomeComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule]
})
export class HomeModule {}
