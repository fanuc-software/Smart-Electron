import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { TabsModule } from 'ngx-bootstrap';
import { HomeComponent } from './wel-home/home.component';
import { SharedModule } from '../shared/shared.module';
import { WebHomeComponent } from './web-home/web-home.component';
import { HomeZrenderComponent } from './home-zrender/home-zrender.component';
import { HomeControlComponent } from './home-control/home-control.component';
import { HostMonitorComponent } from './host-monitor/host-monitor.component';
import { CycleListComponent } from './host-monitor/cycle-list/cycle-list.component';
import { CycleResultComponent } from './host-monitor/cycle-result/cycle-result.component';
import { ReadWriterComponent } from './host-monitor/read-writer/read-writer.component';
import { ProgramResovleComponent } from './host-monitor/program-resovle/program-resovle.component';

@NgModule({
  declarations: [
    HomeComponent,
    WebHomeComponent,
    HomeZrenderComponent,
    HomeControlComponent,
    HostMonitorComponent,
    CycleListComponent,
    CycleResultComponent,
    ReadWriterComponent,
    ProgramResovleComponent
  ],
  imports: [CommonModule, SharedModule, HomeRoutingModule, TabsModule.forRoot()]
})
export class HomeModule { }
