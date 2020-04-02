import { IZrenderNode, BaseAssetsNode } from "./zrender-Factory";

export class HomeAlarm implements IZrenderNode {
    public MainElementNodes: any[] = [];
    private upNode: any;
    private middleNode: any;
    private downNode: any;
    constructor() {

        let upProgress = 0;

        this.upNode = new AlarmZrenderNode({ x: 280, y: 163 }, { x: 9.4, y: 64.4 }, { x: 4.4, y: 78.6 }, { x: 50, y: 20 }, { x: 59, y: 38 }, { width: 75, height: 99 }, { width: 52, height: 70 }, 'up', upProgress);

        let middleProgress = 0;

        this.middleNode = new AlarmZrenderNode({ x: 260, y: 240 }, { x: 19.5, y: 62.8 }, { x: 19.5, y: 76.5 }, { x: 65, y: 38 }, { x: 75, y: 52 }, { width: 48, height: 92 }, { width: 24, height: 67 }, 'middle', middleProgress);


        let downProgress = 0;

        this.downNode = new AlarmZrenderNode({ x: 260, y: 310 }, { x: 24.5, y: 72 }, { x: 29.5, y: 86.5 }, { x: 65, y: 55 }, { x: 78, y: 69 }, { width: 74, height: 94 }, { width: 52, height: 70 }, 'down', downProgress);


        this.MainElementNodes.push(this.upNode.mainZrender);
        this.MainElementNodes.push(this.middleNode.mainZrender);
        this.MainElementNodes.push(this.downNode.mainZrender);
    }
    private getRandom(min: number) {
        let res = Math.round(min / 10) * 10;
        if (res < 0) {
            res = 0;
        }
        if (res > 100) {
            res = 100;
        }
        return res;
    }
    public refresh(node: any) {
        if (node.fullNamespace === 'MMK.SmartSystem.WebCommon.DeviceModel.ReadPmcResultItemModel' && Array.isArray(node.value) && node.value.length > 0) {

            let newVal = node.value.filter(d => d.id === 'Home-xState');
            if (newVal && newVal.length > 0) {
                const state = newVal[0].value;
                if (state === 'True') {
                    this.upNode.updateGreenState(false);
                    this.upNode.updateRedState(true);
                } else {
                    this.upNode.updateGreenState(true);
                    this.upNode.updateRedState(false);
                }

            }

            newVal = node.value.filter(d => d.id === 'Home-yState');
            if (newVal && newVal.length > 0) {
                const state = newVal[0].value;
                if (state === 'True') {
                    this.middleNode.updateGreenState(false);
                    this.middleNode.updateRedState(true);
                } else {
                    this.middleNode.updateGreenState(true);
                    this.middleNode.updateRedState(false);
                }
            }

            newVal = node.value.filter(d => d.id === 'Home-zState');
            if (newVal && newVal.length > 0) {
                const state = newVal[0].value;
                if (state === 'True') {
                    this.downNode.updateGreenState(false);
                    this.downNode.updateRedState(true);
                } else {
                    this.downNode.updateGreenState(true);
                    this.downNode.updateRedState(false);
                }
            }
        }
        if (node.fullNamespace == 'MMK.SmartSystem.WebCommon.DeviceModel.ReadPositionResultItemModel' && Array.isArray(node.value)) {
            node.value.forEach(item => {

                if (item.id == 'positonXLoad') {
                    this.upNode.updateProgress(this.getRandom(item.value));

                }
                if (item.id == 'positonYLoad') {
                    this.middleNode.updateProgress(this.getRandom(item.value));

                } if (item.id == 'positonZLoad') {
                    this.downNode.updateProgress(this.getRandom(item.value));

                }
            });
        }
    }
}

class AlarmZrenderNode extends BaseAssetsNode {
    public mainZrender: any;
    private progressZrender: any;
    private greenStateZrender: any;
    private redStateZrender: any;
    constructor(groupPositon: { x: number, y: number }, greenStatePosition: { x: number, y: number },
        redStatePosition: { x: number, y: number }, progressBgPosition: { x: number, y: number },
        progressPosition: { x: number, y: number }, bgSize: { width: number, height: number },
        progressSize: { width: number, height: number }, public key: string, currentProgress: number) {
        super();
        this.mainZrender = new zrender.Group();
        this.mainZrender.position[0] = groupPositon.x;
        this.mainZrender.position[1] = groupPositon.y;
        this.greenStateZrender = new zrender.Image({
            style: {
                image: `${this.basePath}/images/state-green.png`,
                width: 36,
                height: 36,
                x: greenStatePosition.x,
                y: greenStatePosition.y
            }
        });
        this.redStateZrender = new zrender.Image({
            style: {
                image: `${this.basePath}/images/state-red.png`,
                width: 36,
                height: 36,
                x: redStatePosition.x,
                y: redStatePosition.y
            }
        });
        const progressBg = new zrender.Image({
            style: {
                image: `${this.basePath}/images/alarm-${this.key}.png`,
                width: bgSize.width,
                height: bgSize.height,
                x: progressBgPosition.x,
                y: progressBgPosition.y
            }
        });

        this.progressZrender = new zrender.Image({
            style: {
                image: `${this.basePath}/images/${this.key}-${currentProgress}.png`,
                width: progressSize.width,
                height: progressSize.height,
                x: progressPosition.x,
                y: progressPosition.y
            }
        });
        this.mainZrender.add(this.greenStateZrender);
        this.mainZrender.add(this.redStateZrender);
        this.mainZrender.add(progressBg);
        this.mainZrender.add(this.progressZrender);
    }

    public updateProgress(newProgress: number) {
        this.progressZrender.attr('style', {
            image: `${this.basePath}/images/${this.key}-${newProgress}.png`

        });
    }
    public updateGreenState(isActive: boolean) {
        const state = isActive ? '-active' : '';
        this.greenStateZrender.attr('style', {
            image: `${this.basePath}/images/state-green${state}.png`

        });
    }
    public updateRedState(isActive: boolean) {
        const state = isActive ? '-active' : '';
        this.redStateZrender.attr('style', {
            image: `${this.basePath}/images/state-red${state}.png`

        });
    }
}