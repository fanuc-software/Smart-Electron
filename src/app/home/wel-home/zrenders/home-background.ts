import { IZrenderNode } from "./zrender-Factory";

export class HomeBackground implements IZrenderNode {
    public MainElementNodes: any[] = [];
    private alarmState: any;
    constructor() {
        const background = new zrender.Image({
            style: {
                image: '../../../../assets/images/background.png',
                width: 1366,
                height: 768
            }
        });
        const title = new zrender.Image({
            style: {
                image: '../../../../assets/images/laserEngine.png',
                width: 265,
                height: 33,
                x: 550,
                y: 35
            }
        });
        this.alarmState = new zrender.Image({
            style: {
                image: '../../../../assets/images/normal.png',
                width: 72,
                height: 57,
                x: 80,
                y: 330
            }
        });
        this.MainElementNodes.push(background);
        this.MainElementNodes.push(title);
        this.MainElementNodes.push(this.alarmState);
    }
    public updateRunState(isAlarm: boolean) {
        const imagePath = isAlarm ? 'alarm' : 'normal';
        this.alarmState.attr('style', {
            image: `../../../../assets/images/${imagePath}.png`
        });
    }
}