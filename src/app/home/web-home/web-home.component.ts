import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppConsts } from '../../shared/AppConsts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-web-home',
  templateUrl: './web-home.component.html',
  styleUrls: ['./web-home.component.scss']

})
export class WebHomeComponent implements OnInit, OnDestroy {

  refresh: any;
  constructor(private routerInfo: ActivatedRoute) {
    this.refresh = (url) => {
      const webview = document.querySelector('webview') as any;
      webview.src = url;
    };
    abp.event.on(AppConsts.abpEvent.RefreshUrlEvent, this.refresh);
  }

  ngOnInit() {
    const url = this.routerInfo.snapshot.params['id'];
    console.log(url);
    const webview = document.querySelector('webview') as any;
    if (url) {
      webview.src = url;
    }
    const loadstart = () => {
      console.log('loading...');
      abp.notify.info('Loading');
    }

    const loadstop = () => {
    }

    webview.addEventListener('did-start-loading', loadstart);
    webview.addEventListener('did-stop-loading', loadstop);
    webview.addEventListener('close', () => {
      webview.src = 'about:blank';
    })
  }
  ngOnDestroy(): void {
    abp.event.off(AppConsts.abpEvent.RefreshUrlEvent, this.refresh);
  }
}
