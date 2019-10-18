import { IZrenderNode, BaseAssetsNode } from "./zrender-Factory";

export class HomeAlarm implements IZrenderNode {
    public MainElementNodes: any[] = [];
    private nodes: AlarmZrenderNode[] = [];
    constructor() {

        let upProgress = 100;

        const upNode = new AlarmZrenderNode({ x: 280, y: 163 }, { x: 9.4, y: 64.4 }, { x: 4.4, y: 78.6 }, { x: 50, y: 20 }, { x: 59, y: 38 }, { width: 75, height: 99 }, { width: 52, height: 70 }, 'up', upProgress);
        setInterval(() => {
            upProgress = upProgress % 100;
            upNode.updateProgress(upProgress);
            upProgress += 10;
            upNode.updateGreenState(upProgress <= 50);
            upNode.updateRedState(upProgress > 50);
        }, 300);

        let middleProgress = 100;

        const middleNode = new AlarmZrenderNode({ x: 260, y: 240 }, { x: 19.5, y: 62.8 }, { x: 19.5, y: 76.5 }, { x: 65, y: 38 }, { x: 75, y: 52 }, { width: 48, height: 92 }, { width: 24, height: 67 }, 'middle', middleProgress);
        setInterval(() => {
            middleProgress = middleProgress % 100;
            middleProgress == 0 ? 100 : middleProgress;
            middleNode.updateProgress(middleProgress);
            middleProgress += 10;
            middleNode.updateGreenState(middleProgress <= 50);
            middleNode.updateRedState(middleProgress > 50);
        }, 1000);

        let downProgress = 100;

        const downNode = new AlarmZrenderNode({ x: 260, y: 310 }, { x: 24.5, y: 72 }, { x: 29.5, y: 86.5 }, { x: 65, y: 55 }, { x: 78, y: 69 }, { width: 74, height: 94 }, { width: 52, height: 70 }, 'down', downProgress);
        setInterval(() => {
            downProgress += 10;
            downProgress = downProgress % 100;
            downProgress == 0 ? 100 : downProgress;
            downNode.updateProgress(downProgress);
            downNode.updateGreenState(downProgress <= 50);
            downNode.updateRedState(downProgress > 50);
        }, 2000);

        this.MainElementNodes.push(upNode.mainZrender);
        this.MainElementNodes.push(middleNode.mainZrender);
        this.MainElementNodes.push(downNode.mainZrender);
        this.nodes.push(upNode);
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