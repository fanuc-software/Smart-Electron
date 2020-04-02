import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConsts } from '../AppConsts';
import { ErrorMataModel } from './cnc-alarm';
const { ipcRenderer } = require('electron')

@Injectable({

  providedIn: 'root'

})
export class SignalrServcieProxyService {
  private cncHub = null;
  private webClientHub = null;
  constructor() {
    abp.signalr.autoConnect = true;
  }

  public stop() {
    if (this.webClientHub) {
      this.webClientHub.stop();
    }
    if (this.cncHub) {
      this.cncHub.stop();
    }
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
