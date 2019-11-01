import { IZrenderNode, BaseAssetsNode } from "./zrender-Factory";
import { AppConsts } from "../../../shared/AppConsts";
import { WebRouteComponentDto } from "../../../shared/services/WebRouteComponentDto";
const { ipcRenderer } = require('electron')

export class HomeBackground extends BaseAssetsNode implements IZrenderNode {
    public MainElementNodes: any[] = [];
    private alarmState: any;
    constructor() {
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

                text: '进入首页',
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
                text: '我的菜单',
                fontSize: 20,
                fontWeight: 1,
                textFill: 'white',

            }
        });
        linkMenu.on('click', (e) => {
            const webroute = new WebRouteComponentDto();
            webroute.windowName = 'WebRoute';
            webroute.componentUrl = '/home/control';
            webroute.width = 800;
            webroute.height = 600;
            webroute.positionX = 100;
            webroute.positionY = 100;
            ipcRenderer.send('open-dialow-window', webroute);

        })
        linkHome.on('click', (e) => {
            console.log('Link Home');
            abp.event.trigger(AppConsts.abpEvent.LinkHomeEvent, 'Home');
        });


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