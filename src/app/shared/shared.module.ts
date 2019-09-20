import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { SignalrServcieProxyService } from './services/signalr-servcie-proxy.service';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective],
  imports: [CommonModule, TranslateModule],
  exports: [TranslateModule, WebviewDirective],
  providers:[SignalrServcieProxyService]
})
export class SharedModule {}
