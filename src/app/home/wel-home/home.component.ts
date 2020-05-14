import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainZrenderFactory } from './zrenders/home.zrender';
import { BaseAssetsNode } from './zrenders/zrender-Factory';
import { SignalrServcieProxyService } from '../../shared/services/signalr-servcie-proxy.service';
import { AppConsts } from '../../shared/AppConsts';
import { Title } from "@angular/platform-browser";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseAssetsNode implements OnInit, OnDestroy {

  mainZrender: MainZrenderFactory;
  imagePath = ['gray', 'green', 'yellow', 'red','red','red','red','red','red','red','red','red'];
  index = 0;
  loadPath = '';
  cncDataEvent;
  constructor(private serviceProxy: SignalrServcieProxyService, private titleSet: Title, private http: HttpClient) {
    super();

    this.cncDataEvent = (node) => {
      if (node.fullNamespace == 'MMK.SmartSystem.WebCommon.DeviceModel.ReadPmcResultItemModel' && Array.isArray(node.value) && node.value.length > 0) {

        const newVal = node.value.filter(d => d.id === 'Home-cncState');
        if (newVal && newVal.length > 0) {
          this.index = newVal[0].value;
          this.loadPath = this.getImageSrc();
        }

      }
      this.mainZrender.Refresh(node);
    };
    this.serviceProxy.initCncSignalr();
    this.serviceProxy.initCncWebClientSignalr();
  }

  ngOnInit() {
    this.mainZrender = new MainZrenderFactory(document.getElementById('main'), this.http);

    this.mainZrender.build();
    this.loadPath = this.getImageSrc();
    abp.event.on(AppConsts.abpEvent.GetCNCDataEvent, this.cncDataEvent);
  }

  ngOnDestroy(): void {
    this.serviceProxy.stop();
    abp.event.off(AppConsts.abpEvent.GetCNCDataEvent, this.cncDataEvent);
  }
  getImageSrc() {
    const name = this.imagePath[this.index];
    this.index++;
    this.index = this.index % 3;
    return `${this.basePath}/images/${name}.gif`;
  }

}
