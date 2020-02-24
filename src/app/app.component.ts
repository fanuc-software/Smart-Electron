import { Component } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { Router } from '@angular/router';
import { AppConsts } from './shared/AppConsts';

import { WebRouteComponentDto } from './shared/services/WebRouteComponentDto';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  connection;
  myNotification: Notification;
  constructor(public electronService: ElectronService, private translate: TranslateService, private router: Router) {
    translate.setDefaultLang('en');
    this.electronService.ipcRenderer.on('NavWebRouter', (event, message: WebRouteComponentDto) => {
      console.log(message.windowName);
      if (message.windowName == 'WebRoute') {
        this.router.navigate([message.componentUrl]);

      } else {
        this.router.navigate([message.componentUrl, message.windowName]);

      }
    });
    this.initSignalr();
    abp.event.on(AppConsts.abpEvent.LinkHomeEvent, (node) => {
      this.connection.invoke('navHome');
    });
  }

  private initSignalr() {
    console.log('Init Signalr');
    abp.signalr.startConnection(AppConsts.remoteServiceBaseUrl + '/hubs-routeHub', (connection) => {
      this.connection = connection;
      connection.on('GetRoute', (message: string) => {
        // console.log("received message: ", message);
        if (!message.toLocaleLowerCase().includes('http')) {
          abp.event.trigger(AppConsts.abpEvent.HomePageOnLoadEvent, message);
          //   this.router.navigateByUrl(message);
        } else {
          this.router.navigate(['/home/web', message]);
          abp.event.trigger(AppConsts.abpEvent.RefreshUrlEvent, message);
        }
      });
      connection.on('GetWebDialogWindow', (message: WebRouteComponentDto) => {
        //  console.log("received message: ", message);
        this.electronService.ipcRenderer.send('open-dialow-window', message);

      });

    }).then((connection) => {

      // if (this.myNotification) {
      //   this.myNotification.close();
      //   this.myNotification = new Notification('网络通知', {
      //     body: '【routeHub】 重新连接成功！'
      //   })
      //   this.myNotification = null;
      // }
      // connection.connection.onclose = (d) => {
      //   this.myNotification = new Notification('网络通知', {
      //     body: '【routeHub】 连接中断，正在重新连接...'
      //   });

      //   setTimeout(() => {
      //     this.initSignalr();
      //   }, 5000)
      // }

    }).catch(error => {
      // setTimeout(() => {
      //   this.initSignalr();
      // }, 5000)
    });

  }
}
