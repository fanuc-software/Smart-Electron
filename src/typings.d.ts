///<reference path="../node_modules/@types/jquery/index.d.ts"/>
///<reference path="../node_modules/abp-web-resources/Abp/Framework/scripts/abp.d.ts"/>
///<reference path="../node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.jquery.d.ts"/>
///<reference path="../node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.signalr.d.ts"/>
///<reference path="../node_modules/moment/moment.d.ts"/>


// Typings reference file, see links for more information
// https://github.com/typings/typings
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare var System: any;
declare var App: any; // Related to Metronic
declare var Layout: any; // Related to Metronic
declare var zrender: any;
declare var Push: any;
declare var numeral: any;
interface JQuery {
  countTo(...any): any;
}

interface JQuery {
  sparkline(...any): any;
}

interface JQueryStatic {
  AdminBSB: any;
}

/* SystemJS module definition */
declare var nodeModule: NodeModule;
interface NodeModule {
  id: string;
}
//declare var window: Window;
interface Window {
  process: any;
  require: any;
}
