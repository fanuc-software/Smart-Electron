import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AppConsts } from '../../shared/AppConsts';
import { CycleListComponent } from './cycle-list/cycle-list.component';
import { SignalrServcieProxyService } from '../../shared/services/signalr-servcie-proxy.service';
import { CycleResultComponent } from './cycle-result/cycle-result.component';
import { ReadWriterComponent } from './read-writer/read-writer.component';
import { ProgramResovleComponent } from './program-resovle/program-resovle.component';
import { ErrorMataModel } from '../../shared/services/cnc-alarm';

@Component({
  selector: 'app-host-monitor',
  templateUrl: './host-monitor.component.html',
  styleUrls: ['./host-monitor.component.scss']
})
export class HostMonitorComponent implements OnInit, OnDestroy {

  @ViewChild('cycleList', { static: true }) cycleList: CycleListComponent;
  @ViewChild('cycleResult', { static: true }) cycleResult: CycleResultComponent;
  @ViewChild('readWriter', { static: true }) readWriter: ReadWriterComponent;
  @ViewChild('programResovle', { static: true }) programResovle: ProgramResovleComponent;

  errNodes: any[] = [];
  getCncError: any;
  getCncData: any;
  getCncReadWriter: any;
  getCncProgram: any;
  constructor(private serviceProxy: SignalrServcieProxyService) {
    this.getCncError = (s: ErrorMataModel) => {
      if (this.errNodes.length > 20) {
        this.errNodes = [];
      }
      this.errNodes.unshift({ time: this.getCurrentTime(), text: s.message });
    };
    this.getCncData = (d) => {
      this.cycleResult.setData(d);
    };
    this.getCncReadWriter = (d) => {
      this.readWriter.setData(d);
    };
    this.getCncProgram = (d) => {
      this.programResovle.setData(d);
    }
    abp.event.on(AppConsts.abpEvent.GetCncErrorEvent, this.getCncError);
    abp.event.on(AppConsts.abpEvent.GetCNCDataEvent, this.getCncData);
    abp.event.on(AppConsts.abpEvent.GetReadWriter, this.getCncReadWriter);
    abp.event.on(AppConsts.abpEvent.GetProgram, this.getCncProgram);

    serviceProxy.initCncSignalr();
  }
  ngOnInit() {
    abp.signalr.startConnection(AppConsts.remoteServiceBaseUrl + '/hubs-cncClientHub', (connection) => {

      connection.on('GetCncEvent', (message) => {
        this.cycleList.setData(message);
      });

    })

  }
  getCurrentTime() {
    return new Date().toTimeString();
  }
  removeAll() {
    this.errNodes = [];
  }
  ngOnDestroy(): void {
    abp.event.off(AppConsts.abpEvent.GetCncErrorEvent, this.getCncError);
    abp.event.off(AppConsts.abpEvent.GetCNCDataEvent, this.getCncData);
    abp.event.off(AppConsts.abpEvent.GetReadWriter, this.getCncReadWriter);
    abp.event.off(AppConsts.abpEvent.GetProgram, this.getCncProgram);

  }
}
