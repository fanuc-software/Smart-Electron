import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConsts } from '../AppConsts';

@Injectable()
export class SignalrServcieProxyService {
  chatHub = null;
  cncHub = null;
  constructor(private router: Router) {
    // this.initSignalr();
    this.initCncSignalr();
  }
  initSignalr() {

    abp.signalr.startConnection(AppConsts.remoteServiceBaseUrl + '/hubs-routeHub', (connection) => {
      this.chatHub = connection; // Save a reference to the hub
      connection.on('GetRoute', (message: string) => { // Register for incoming messages
        console.log("received message: ", message);
        if (!message.toLocaleLowerCase().includes('http')) {
          this.router.navigateByUrl(message);
        } else {
          this.router.navigate(['/home/web', message]);
          abp.event.trigger(AppConsts.abpEvent.RefreshUrlEvent, message);
        }
      });

    }).then((connection) => {
      abp.log.debug('Connected to routeHub server!');
    });
  }
  initCncSignalr() {
    abp.signalr.startConnection(AppConsts.remoteServiceBaseUrl + '/hubs-cncHub', (connection) => {
      this.cncHub = connection; // Save a reference to the hub
      connection.on('GetCNCData', (message: string) => { // Register for incoming messages
        console.log("[GetCNCData ]: ", message);

      });
      connection.on('GetError', (message: string) => { // Register for incoming messages
        console.log("[GetError ]: ", message);

      });
    }).then((connection) => {
      abp.log.debug('Connected to cncHub server!');
      abp.event.trigger('connectSuccesss', true);
    });
    abp.event.on('cncRefreshEvent', (s) => {
      console.log(JSON.stringify(s));
      this.cncHub.invoke('refresh', JSON.stringify(s));
    //  this.cncHub.invoke('sendMessage', JSON.stringify(s));

      
    });
  }




}
