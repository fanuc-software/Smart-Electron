import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppConsts } from '../../shared/AppConsts';
import { ErrorMataModel, AlarmHandlerEnum, HandlerTypeStyle, CNCAlarmModel } from '../../shared/services/cnc-alarm';
import { SignalrServcieProxyService } from '../../shared/services/signalr-servcie-proxy.service';

@Component({
  selector: 'app-home-alarm',
  templateUrl: './home-alarm.component.html',
  styleUrls: ['./home-alarm.component.scss']
})
export class HomeAlarmComponent implements OnInit, OnDestroy {
  GetHubErrorMata: any;
  GetCncErrorEvent: any;
  nodes: ErrorMataModel[] = [];
  mapStyle: Map<AlarmHandlerEnum, HandlerTypeStyle> = new Map<AlarmHandlerEnum, HandlerTypeStyle>();
  constructor(private serviceProxy: SignalrServcieProxyService) {
    this.initStyle();
    this.GetHubErrorMata = (node: ErrorMataModel[]) => {
      console.log(node);
      node.forEach(d => {
        d.alarmModel = new CNCAlarmModel();
        this.nodes.push(d);

      });
    };
    this.GetCncErrorEvent = (node: ErrorMataModel) => {
      console.log(node);

      const temp = this.nodes.filter(d => d.message == node.message && d.handler == node.handler);
      if (temp && temp.length > 0) {
        temp[0].updateTime = node.updateTime;
      } else {
        if (this.mapStyle.has(AlarmHandlerEnum[node.handler])) {
          node.alarmModel.style = this.mapStyle.get(node.alarmModel.handlerType);

        }
        this.nodes.unshift(node);
      }
    }
  }

  ngOnInit() {
    this.serviceProxy.initCncSignalr();
    abp.event.on(AppConsts.abpEvent.GetHubErrorMata, this.GetHubErrorMata);
    abp.event.on(AppConsts.abpEvent.GetCncErrorEvent, this.GetCncErrorEvent);

  }
  ngOnDestroy(): void {
    abp.event.off(AppConsts.abpEvent.GetHubErrorMata, this.GetHubErrorMata);
    abp.event.off(AppConsts.abpEvent.GetCncErrorEvent, this.GetCncErrorEvent);
  }
  initStyle() {
    this.mapStyle.set(AlarmHandlerEnum.alarm, new HandlerTypeStyle('bg-red', 'bookmark'));
    this.mapStyle.set(AlarmHandlerEnum.cycleTime, new HandlerTypeStyle('bg-purple', 'favorite'));
    this.mapStyle.set(AlarmHandlerEnum.feedrate, new HandlerTypeStyle('bg-red', 'bookmark'));
    this.mapStyle.set(AlarmHandlerEnum.macro, new HandlerTypeStyle('bg-red', 'face'));
    this.mapStyle.set(AlarmHandlerEnum.notice, new HandlerTypeStyle('bg-deep-purple', 'bookmark'));
    this.mapStyle.set(AlarmHandlerEnum.paraAssistGas, new HandlerTypeStyle('bg-red', 'face'));
    this.mapStyle.set(AlarmHandlerEnum.paraCommon, new HandlerTypeStyle('bg-red', 'bookmark'));
    this.mapStyle.set(AlarmHandlerEnum.paraReferencePosition, new HandlerTypeStyle('bg-red', 'favorite'));
    this.mapStyle.set(AlarmHandlerEnum.pmc, new HandlerTypeStyle('bg-indigo', 'face'));
    this.mapStyle.set(AlarmHandlerEnum.position, new HandlerTypeStyle('bg-red', 'favorite'));
    this.mapStyle.set(AlarmHandlerEnum.programBlock, new HandlerTypeStyle('bg-indigo', 'bookmark'));
    this.mapStyle.set(AlarmHandlerEnum.programName, new HandlerTypeStyle('bg-red', 'face'));
    this.mapStyle.set(AlarmHandlerEnum.programStr, new HandlerTypeStyle('bg-indigo', 'bookmark'));
    this.mapStyle.set(AlarmHandlerEnum.workpartNum, new HandlerTypeStyle('bg-red', 'bookmark'));

  }
}
