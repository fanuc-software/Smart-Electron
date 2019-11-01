import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConsts } from '../AppConsts';
const { ipcRenderer } = require('electron')

@Injectable({

  providedIn: 'root'

})
export class SignalrServcieProxyService {
  private chatHub = null;
  private cncHub = null;
  private webClientHub = null;
  constructor(private router: Router) {
    abp.signalr.autoConnect = false;
    this.initCncSignalr();
    this.initCncWebClientSignalr();
  }

  private initCncSignalr() {
    abp.signalr.startConnection(AppConsts.remoteServiceBaseUrl + '/hubs-cncHub', (connection) => {
      this.cncHub = connection;
      connection.on('GetCNCData', (message: any) => {
        abp.event.trigger(AppConsts.abpEvent.GetCNCDataEvent, message.data);
      });
      connection.on('GetError', (message: string) => {
        console.log("[GetError ]: ", message);

      });
    }).then((connection) => {
    });

  }
  private initCncWebClientSignalr() {

    abp.signalr.startConnection(AppConsts.remoteServiceBaseUrl + '/hubs-cncWebClient', (connection) => {
      this.webClientHub = connection;
    }).then((connection) => {
      abp.log.debug('Connected to cncWebClient server!');
      abp.event.trigger(AppConsts.abpEvent.WebClientConnectedEvent, "SUCCESS");

    });
    abp.event.on(AppConsts.abpEvent.HomePageOnLoadEvent, (s) => {
      if (this.webClientHub) {
        this.webClientHub.invoke('pageOnLoad');

      }
    });
    abp.event.on(AppConsts.abpEvent.HomePageOnLeaveEvent, (s) => {
      if (this.webClientHub) {
        this.webClientHub.invoke('pageOnLeave');

      }
    });

  }





}
