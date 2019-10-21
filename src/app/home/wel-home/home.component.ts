import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainZrenderFactory } from './zrenders/home.zrender';
import { BaseAssetsNode } from './zrenders/zrender-Factory';
import { SignalrServcieProxyService } from '../../shared/services/signalr-servcie-proxy.service';
import { AppConsts } from '../../shared/AppConsts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseAssetsNode implements OnInit, OnDestroy {

  mainZrender: MainZrenderFactory;
  imagePath = ['green', 'gray', 'red'];
  index = 0;
  loadPath = '';
  webClientConnectEvent;
  cncDataEvent;
  constructor(private serviceProxy: SignalrServcieProxyService) {
    super();
    this.webClientConnectEvent = (t) => {
      abp.event.trigger(AppConsts.abpEvent.HomePageOnLoadEvent);
    };
    this.cncDataEvent = (node) => {
      this.mainZrender.Refresh(node);    };
  }

  ngOnInit() {
    this.mainZrender = new MainZrenderFactory(document.getElementById('main'), this.serviceProxy);

    this.mainZrender.build();
    this.loadPath = this.getImageSrc();
    setInterval(() => this.loadPath = this.getImageSrc(), 1500);
    abp.event.on(AppConsts.abpEvent.WebClientConnectedEvent, this.webClientConnectEvent);
    abp.event.on(AppConsts.abpEvent.GetCNCDataEvent, this.cncDataEvent);
  }

  ngOnDestroy(): void {
    abp.event.off(AppConsts.abpEvent.WebClientConnectedEvent, this.webClientConnectEvent);
    abp.event.trigger(AppConsts.abpEvent.HomePageOnLeaveEvent);
    abp.event.off(AppConsts.abpEvent.GetCNCDataEvent, this.cncDataEvent);
  }
  getImageSrc() {
    const name = this.imagePath[this.index];
    this.index++;
    this.index = this.index % 3;
    return `${this.basePath}/images/${name}.gif`;
  }
}
