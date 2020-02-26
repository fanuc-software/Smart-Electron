import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConsts } from '../AppConsts';
import { ErrorMataModel } from './cnc-alarm';
const { ipcRenderer } = require('electron')

@Injectable({

  providedIn: 'root'

})
export class SignalrServcieProxyService {
  private chatHub = null;
  private cncHub = null;
  private webClientHub = null;
  constructor(private router: Router) {
    abp.signalr.autoConnect = true;
    abp.event.on(AppConsts.abpEvent.HomePageOnLoadEvent, (s) => {
      if (this.webClientHub) {
        console.log('pageOnLoad');
        this.webClientHub.invoke('pageOnLoad');

      }
    });
    abp.event.on(AppConsts.abpEvent.HomePageOnLeaveEvent, (s) => {
      if (this.webClientHub) {
        console.log('pageOnLeave');

        this.webClientHub.invoke('pageOnLeave');

      }
    });
  }

  public initCncSignalr() {
    console.log('initCncSignalr');
    abp.signalr.startConnection(AppConsts.remoteServiceBaseUrl + '/hubs-cncHub?webHistory=true', (connection) => {
      this.cncHub = connection;
      connection.on('GetCNCData', (message: any) => {
        // console.log(message);
        abp.event.trigger(AppConsts.abpEvent.GetCNCDataEvent, message.data);
      });
      connection.on('GetReadWriter', (message: any) => {
        abp.event.trigger(AppConsts.abpEvent.GetReadWriter, message);
      });
      connection.on('GetProgram', (message: any) => {
        abp.event.trigger(AppConsts.abpEvent.GetProgram, message);
      });
      connection.on('GetHubErrorMata', (message: ErrorMataModel[]) => {
        console.log(message);
        abp.event.trigger(AppConsts.abpEvent.GetHubErrorMata, message);
      });
      connection.on('GetError', (message: ErrorMataModel) => {
        // abp.log.debug("[GetError ]: " + message);
        abp.event.trigger(AppConsts.abpEvent.GetCncErrorEvent, message);


      });

    }).then((connection) => {
      abp.notify.success('The network 【cncHub】 has connected.', 'Connected Success');

      // connection.connection.onclose = (d) => {
      //   abp.notify.error('The network 【cncHub】 has been disconnected.', 'Network disconnected');
      //   setTimeout(() => {
      //     this.initCncSignalr();
      //   }, 5000)
      // }

    }).catch(error => {
      // setTimeout(() => {
      //   this.initCncSignalr();
      // }, 5000)
    });

  }
  public initCncWebClientSignalr() {
    console.log('initCncWebClientSignalr');

    abp.signalr.startConnection(AppConsts.remoteServiceBaseUrl + '/hubs-cncWebClient', (connection) => {
      this.webClientHub = connection;
    }).then((connection) => {
      abp.notify.success('The network 【cncWebClient】 has connected.', 'Connected Success');
      abp.event.trigger(AppConsts.abpEvent.WebClientConnectedEvent, "SUCCESS");
      // connection.connection.onclose = (d) => {
      //   abp.notify.error('The network 【cncWebClient】 been disconnected.', 'Network disconnected');
      //   setTimeout(() => {
      //     this.initCncWebClientSignalr();
      //   }, 5000)
      // }

    }).catch(error => {
      // setTimeout(() => {
      //   this.initCncWebClientSignalr();
      // }, 5000)
    });


  }





}
