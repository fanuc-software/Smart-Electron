import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConsts } from '../AppConsts';

@Injectable()
export class SignalrServcieProxyService {
  chatHub = null;

  constructor(private router: Router) {
    this.initSignalr();
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
}
