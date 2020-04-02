import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppConsts } from '../../shared/AppConsts';
import { ErrorMataModel, AlarmHandlerEnum, HandlerTypeStyle, CNCAlarmModel } from '../../shared/services/cnc-alarm';
import { SignalrServcieProxyService } from '../../shared/services/signalr-servcie-proxy.service';
import * as moment from 'moment';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home-alarm',
  templateUrl: './home-alarm.component.html',
  styleUrls: ['./home-alarm.component.scss']
})
export class HomeAlarmComponent implements OnInit, OnDestroy {
  GetHubErrorMata: any;
  GetCncErrorEvent: any;
  nodes: ErrorMataModel[] = [];
  interCallBack: any;
  mapStyle: Map<AlarmHandlerEnum, HandlerTypeStyle> = new Map<AlarmHandlerEnum, HandlerTypeStyle>();
  cncHub;
  constructor() {

    this.initStyle();
    this.GetHubErrorMata = (node: ErrorMataModel[]) => {
      console.log(node);
      node.forEach(d => {
        d.alarmModel = new CNCAlarmModel();
        const dd = AlarmHandlerEnum[d.handler.replace("Handler", "")];

        if (this.mapStyle.has(dd)) {
          d.alarmModel.style = this.mapStyle.get(dd);

        }
        if (this.nodes.length < 12) {
          this.nodes.push(d);

        }

      });
    };
    this.GetCncErrorEvent = (node: ErrorMataModel) => {
      node.alarmModel = new CNCAlarmModel();

      const temp = this.nodes.filter(d => d.message == node.message && d.handler == node.handler);
      if (temp && temp.length > 0) {
        temp[0].updateTime = node.updateTime;
      } else {
        const dd = AlarmHandlerEnum[node.handler.replace("Handler", "")];
        if (this.mapStyle.has(dd)) {
          node.alarmModel.style = this.mapStyle.get(dd);

        }
        if (this.nodes.length < 12) {
          this.nodes.unshift(node);
        }
      }
    }
  }
  close() {
    console.log('alarm is close');
    abp.event.trigger(AppConsts.abpEvent.LinkHomeEvent, 'Home');

  }
  ngOnInit() {

    this.interCallBack = setInterval(() => {
      let arr = [];
      for (let index = 0; index < this.nodes.length; index++) {
        const element = this.nodes[index];
        if (moment().diff(moment(element.updateTime), 'seconds') > 60) {
          arr.push(index);
        }

      }
      arr.forEach(d => this.nodes.splice(d, 1));

    }, 5000);

  }

  initSignalr() {
    abp.signalr.startConnection(AppConsts.remoteServiceBaseUrl + '/hubs-cncHub?webHistory=true', (connection) => {
      this.cncHub = connection;

      connection.on('GetHubErrorMata', (message: ErrorMataModel[]) => {
        this.GetCncErrorEvent(message);
      });
      connection.on('GetError', (message: ErrorMataModel) => {
        this.GetCncErrorEvent(message);

      });

    });
  }
  ngOnDestroy(): void {
    if (this.cncHub) {
      this.cncHub.stop();
    }
    clearInterval(this.interCallBack);
  }
  initStyle() {
    this.mapStyle.set(AlarmHandlerEnum.Alarm, new HandlerTypeStyle('bg-red', 'error_outline'));
    this.mapStyle.set(AlarmHandlerEnum.CycleTime, new HandlerTypeStyle('bg-purple', 'note'));
    this.mapStyle.set(AlarmHandlerEnum.Feedrate, new HandlerTypeStyle('bg-indigo', 'forum'));
    this.mapStyle.set(AlarmHandlerEnum.Macro, new HandlerTypeStyle('bg-red', 'error_outline'));
    this.mapStyle.set(AlarmHandlerEnum.Notice, new HandlerTypeStyle('bg-purple', 'note'));
    this.mapStyle.set(AlarmHandlerEnum.ParaAssistGas, new HandlerTypeStyle('bg-red', 'error_outline'));
    this.mapStyle.set(AlarmHandlerEnum.ParaCommon, new HandlerTypeStyle('bg-indigo', 'forum'));
    this.mapStyle.set(AlarmHandlerEnum.ParaReferencePosition, new HandlerTypeStyle('bg-red', 'error_outline'));
    this.mapStyle.set(AlarmHandlerEnum.Pmc, new HandlerTypeStyle('bg-indigo', 'forum'));
    this.mapStyle.set(AlarmHandlerEnum.Position, new HandlerTypeStyle('bg-red', 'error_outline'));
    this.mapStyle.set(AlarmHandlerEnum.ProgramBlock, new HandlerTypeStyle('bg-indigo', 'forum'));
    this.mapStyle.set(AlarmHandlerEnum.ProgramName, new HandlerTypeStyle('bg-purple', 'note'));
    this.mapStyle.set(AlarmHandlerEnum.ProgramStr, new HandlerTypeStyle('bg-purple', 'note'));
    this.mapStyle.set(AlarmHandlerEnum.WorkpartNum, new HandlerTypeStyle('bg-red', 'error_outline'));

  }
}
