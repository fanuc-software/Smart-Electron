import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConsts } from '../AppConsts';

@Injectable({

  providedIn: 'root'

})
export class SignalrServcieProxyService {
  private chatHub = null;
  private cncHub = null;
  private webClientHub = null;
  constructor(private router: Router) {
    abp.signalr.autoConnect = false;
    this.initSignalr();
    this.initCncSignalr();
    this.initCncWebClientSignalr();
  }
  private initSignalr() {

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
    abp.event.on(AppConsts.abpEvent.LinkHomeEvent, (node) => {
      abp.log.debug(node);

      this.chatHub.invoke('navHome');
    });
  }
  private initCncSignalr() {
    abp.signalr.startConnection(AppConsts.remoteServiceBaseUrl + '/hubs-cncHub', (connection) => {
      this.cncHub = connection; // Save a reference to the hub
      connection.on('GetCNCData', (message: any) => { // Register for incoming messages
        // console.log("[GetCNCData ]: ", message);
        abp.event.trigger(AppConsts.abpEvent.GetCNCDataEvent, message.data);
      });
      connection.on('GetError', (message: string) => { // Register for incoming messages
        console.log("[GetError ]: ", message);

      });
    }).then((connection) => {
    });

  }
  private initCncWebClientSignalr() {

    abp.signalr.startConnection(AppConsts.remoteServiceBaseUrl + '/hubs-cncWebClient', (connection) => {
      this.webClientHub = connection; // Save a reference to the hub

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
