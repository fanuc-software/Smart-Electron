import { IZrenderNode, BaseAssetsNode } from "./zrender-Factory";
import { AppConsts } from "../../../shared/AppConsts";
import { WebRouteComponentDto } from "../../../shared/services/WebRouteComponentDto";
import { HttpClient } from "@angular/common/http";
const { ipcRenderer } = require('electron')

export class HomeBackground extends BaseAssetsNode implements IZrenderNode {
    public MainElementNodes: any[] = [];
    private alarmState: any;
    constructor(private httpClient: HttpClient) {
        super();
        const background = new zrender.Image({
            style: {
                image: `${this.basePath}/images/background.png`,
                width: 1366,
                height: 768
            }
        });
        const title = new zrender.Image({
            style: {
                image: `${this.basePath}/images/laserEngine.png`,
                width: 265,
                height: 33,
                x: 550,
                y: 35
            }
        });
        this.alarmState = new zrender.Image({
            style: {
                image: `${this.basePath}/images/normal.png`,
                width: 72,
                height: 57,
                x: 80,
                y: 330
            }
        });
        const linkHome = new zrender.Image({
            style: {
                image: `${this.basePath}/images/home-link.png`,
                width: 272,
                height: 44,
                x: 0,
                y: 724,

                text: '',
                fontSize: 20,
                fontWeight: 1,
                textFill: 'white',
                textOffset: [0, 2.5]

            }
        });

        const linkMenu = new zrender.Text({
            style: {
                x: 1200,
                y: 740,
                text: '',
                fontSize: 20,
                fontWeight: 1,
                textFill: 'white',

            }
        });

        // linkMenu.on('click', (e) => {
        //     const webroute = new WebRouteComponentDto();
        //     webroute.windowName = 'WebRoute';
        //     webroute.componentUrl = '/home/alarm';
        //     webroute.width = 1366;
        //     webroute.height = 768;
        //     webroute.positionX = 0;
        //     webroute.positionY = 0;
        //     ipcRenderer.send('open-dialow-window', webroute);
        //     // this.httpClient.post(AppConsts.remoteServiceBaseUrl + '/api/services/app/WebRoute/NavigateWPFDialog', {
        //     //     windowName: "WPFDialogWindow",
        //     //     width: 0,
        //     //     height: 0,
        //     //     positionX: 0,
        //     //     positionY: 0,
        //     //     componentUrl: "WPFDialogWindow"
        //     // }).subscribe(d => { console.log(d); });

        // })
        // linkHome.on('click', (e) => {
        //     console.log('Link Home');
        //     abp.event.trigger(AppConsts.abpEvent.LinkHomeEvent, 'Home');
        //     abp.event.trigger(AppConsts.abpEvent.HomePageOnLeaveEvent, 'Home');

        // });


        this.MainElementNodes.push(background);
        this.MainElementNodes.push(title);
        this.MainElementNodes.push(this.alarmState);
        this.MainElementNodes.push(linkHome);
        this.MainElementNodes.push(linkMenu);
    }
    public refresh(node: any) {
        if (node.fullNamespace == 'MMK.SmartSystem.WebCommon.DeviceModel.ReadPmcResultItemModel' && Array.isArray(node.value) && node.value.length > 0) {

            const newVal = node.value.filter(d => d.id === 'Home-alarmState');
            if (newVal && newVal.length > 0) {
                this.updateRunState(newVal[0].value == 'True');
            }
        }
    }
    private updateRunState(isAlarm: boolean) {
        const imagePath = isAlarm ? 'alarm' : 'normal';
        this.alarmState.attr('style', {
            image: `${this.basePath}/images/${imagePath}.png`
        });
    }
}