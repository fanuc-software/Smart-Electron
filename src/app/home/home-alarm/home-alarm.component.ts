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

  constructor(private serviceProxy: SignalrServcieProxyService) {

    this.initStyle();
    this.GetHubErrorMata = (node: ErrorMataModel[]) => {
      console.log(node);
      node.forEach(d => {
        d.alarmModel = new CNCAlarmModel();
        const dd = AlarmHandlerEnum[d.handler.replace("Handler", "")];

        if (this.mapStyle.has(dd)) {
          d.alarmModel.style = this.mapStyle.get(dd);

        }
        this.nodes.push(d);

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
        this.nodes.unshift(node);
      }
    }
  }
  close() {
    abp.event.trigger(AppConsts.abpEvent.LinkHomeEvent, 'Home');

  }
  ngOnInit() {
    this.serviceProxy.initCncSignalr();
    abp.event.on(AppConsts.abpEvent.GetHubErrorMata, this.GetHubErrorMata);
    abp.event.on(AppConsts.abpEvent.GetCncErrorEvent, this.GetCncErrorEvent);
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
  ngOnDestroy(): void {
    abp.event.off(AppConsts.abpEvent.GetHubErrorMata, this.GetHubErrorMata);
    abp.event.off(AppConsts.abpEvent.GetCncErrorEvent, this.GetCncErrorEvent);
    clearInterval(this.interCallBack);
  }
  initStyle() {
    this.mapStyle.set(AlarmHandlerEnum.Alarm, new HandlerTypeStyle('bg-red', 'bookmark'));
    this.mapStyle.set(AlarmHandlerEnum.CycleTime, new HandlerTypeStyle('bg-purple', 'favorite'));
    this.mapStyle.set(AlarmHandlerEnum.Feedrate, new HandlerTypeStyle('bg-red', 'bookmark'));
    this.mapStyle.set(AlarmHandlerEnum.Macro, new HandlerTypeStyle('bg-red', 'face'));
    this.mapStyle.set(AlarmHandlerEnum.Notice, new HandlerTypeStyle('bg-deep-purple', 'bookmark'));
    this.mapStyle.set(AlarmHandlerEnum.ParaAssistGas, new HandlerTypeStyle('bg-red', 'face'));
    this.mapStyle.set(AlarmHandlerEnum.ParaCommon, new HandlerTypeStyle('bg-red', 'bookmark'));
    this.mapStyle.set(AlarmHandlerEnum.ParaReferencePosition, new HandlerTypeStyle('bg-red', 'favorite'));
    this.mapStyle.set(AlarmHandlerEnum.Pmc, new HandlerTypeStyle('bg-indigo', 'face'));
    this.mapStyle.set(AlarmHandlerEnum.Position, new HandlerTypeStyle('bg-red', 'favorite'));
    this.mapStyle.set(AlarmHandlerEnum.ProgramBlock, new HandlerTypeStyle('bg-indigo', 'bookmark'));
    this.mapStyle.set(AlarmHandlerEnum.ProgramName, new HandlerTypeStyle('bg-red', 'face'));
    this.mapStyle.set(AlarmHandlerEnum.ProgramStr, new HandlerTypeStyle('bg-indigo', 'bookmark'));
    this.mapStyle.set(AlarmHandlerEnum.WorkpartNum, new HandlerTypeStyle('bg-red', 'bookmark'));

  }
}
