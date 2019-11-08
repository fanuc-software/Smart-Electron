import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './wel-home/home.component';
import { WebHomeComponent } from './web-home/web-home.component';
import { HomeZrenderComponent } from './home-zrender/home-zrender.component';
import { HomeControlComponent } from './home-control/home-control.component';
import { HostMonitorComponent } from './host-monitor/host-monitor.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'web/:id', component: WebHomeComponent },
  { path: 'zrender/:name', component: HomeZrenderComponent },
  { path: 'control/:name', component: HomeControlComponent },
  //{ path: 'monitor/:name', component: HostMonitorComponent }
  { path: '', component: HostMonitorComponent }


];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
