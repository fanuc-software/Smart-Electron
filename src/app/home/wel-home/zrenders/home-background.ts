import { IZrenderNode, BaseAssetsNode } from "./zrender-Factory";
import { AppConsts } from "../../../shared/AppConsts";

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
        const linkHome = new zrender.Text({
            style: {
                x: 90,
                y: 740,
                text: '进入首页',
                fontSize: 20,
                fontWeight: 1,
                textFill: 'white',

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