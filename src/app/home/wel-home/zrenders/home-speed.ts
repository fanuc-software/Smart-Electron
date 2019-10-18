import { IZrenderNode, BaseAssetsNode } from "./zrender-Factory";

export class HomeSpeed extends BaseAssetsNode implements IZrenderNode {
    private maxCircleNode: CircleZrenderNode = new CircleZrenderNode();
    public MainElementNodes: any[] = [];
    private speedTopZrender: any;
    private speedProgressZrender: any;
    constructor() {
        super();
        const speedBackground = new zrender.Image({
            style: {
                image: `${this.basePath}/images/speed-background.png`,
                width: 360,
                height: 330,
                x: 498,
                y: 154
               
            }
        });

        const speedBottom = new zrender.Circle({
            shape: {
                cx: 679,
                cy: 335,
                r: 148
            }, style: {
                fill: 'rgba(41,41,41)'
            }
        });
        const speedCrcle = new zrender.Circle({
            shape: {
                cx: 679,
                cy: 335,
                r: 115
            },
            style: {
                fill: '#3E3E3E'
            }
        });
        this.speedTopZrender = new zrender.Image({
            style: {
                image: `${this.basePath}/images/speed-top.png`,
                width: 211,
                height: 211,
                x: 573.5,
                y: 230,
                text: '1500',
                fontSize: 70,
                fontFamily: 'DINCondensed-Bold',
                textFill: '#474646',
                textOffset: [0, 0]
            }
        });
        const gradient = new zrender.LinearGradient(1, 1, 1, 0, [{
            offset: 0.8,
            color: '#171717'
        }, {
            offset: 0,
            color: '#808080'
        }]);
        const sector = new zrender.Sector({
            shape: {
                cx: 679,
                cy: 335,
                r: 148,

                startAngle: Math.PI / 3.28,
                endAngle: Math.PI * 0.698
            },
            style: {
                fill: gradient,
            }
        });
        this.speedProgressZrender = new zrender.Sector({
            shape: {
                cx: 679,
                cy: 335,
                r: 148,
                r0: 110,
                startAngle: this.getAngle(0).startAngle,
                endAngle: this.getAngle(60).endAngle
            },
            style: {
                fill: 'rgba(200,169,80)',
                shadowBlur: 20,
                shadowColor: 'rgba(5,5,5)',
                shadowOffsetX: 0,
               

            }
        });
        this.MainElementNodes.push(speedBackground);
        this.MainElementNodes.push(speedBottom);
        this.MainElementNodes.push(sector);
        this.MainElementNodes.push(this.speedProgressZrender);

        this.MainElementNodes.push(speedCrcle);
        this.MainElementNodes.push(this.speedTopZrender);
        this.maxCircleNode.mainZrenderNodes.forEach(d => this.MainElementNodes.push(d.mainZrender));
        this.doWork();
    }

    private doWork() {
        setInterval(() => {
            const temp = Math.round(Math.random() * 100);
            this.maxCircleNode.updateProgerss(temp);
        }, 2000);

        setInterval(() => {
            const temp = Math.round(Math.random() * 100);
            this.updateMainProgress(temp);
        }, 1000);
        setInterval(() => {
            const temp = Math.round(Math.random() * 2000);
            this.updateSpeedTop(temp);
        }, 100);
    }
    private getAngle(progress: number) {
        const start = 2.1928;
        const end = 0.9578;
        if (progress == 0) {
            return { startAngle: start, endAngle: start }
        }
        if (progress == 100) {
            return { startAngle: start, endAngle: end }

        }
        const total = (Math.PI * 2 - start + end) / 100;
        const endAngle = (start + total * progress) % (2 * Math.PI);
        return { startAngle: start, endAngle: endAngle }
    }
    public updateSpeedTop(value: number) {
        const update = (Array(4).join('0') + value).slice(-4);
        this.speedTopZrender.attr('style', {
            text: update
        });
    }

    public updateMainProgress(progress: number) {

        let color = 'white';
        if (progress <= 30) {
            color = 'green';
        } else if (progress <= 70) {
            color = 'rgba(200,169,80)'
        } else if (progress > 70) {
            color = 'rgba(255,63,0)';
        }
        const gradient = new zrender.LinearGradient(0, 0, 1, 1, [{
            offset: 0.8,
            color: '#415612'
        }, {
            offset: 0.1,
            color: color
        }]);
        this.speedProgressZrender.attr('style', {
            fill: progress > 50 ? color : gradient,
        });
        this.speedProgressZrender.animateTo({
            shape: {
                endAngle: this.getAngle(progress).endAngle,
            },
            // style: {
            //     fill: gradient,
            //     //stroke: 'transparent',
            // }
        }, 200, 0, 'quadraticIn');

    }

}





class CircleZrenderNode {
    public mainZrenderNodes: CircleLineNode[] = [];
    private MinCircle: CircleNode;
    private MaxCircle: CircleNode;
    constructor() {
        this.MinCircle = new CircleNode(198, 679, 335);
        this.MaxCircle = new CircleNode(210, 679, 335);
        this.Build();

    }

    private Build() {
        const maxLen = this.MinCircle.positionNode.length;
        for (let index = 0; index < maxLen; index++) {

            const node = new CircleLineNode(this.MinCircle.positionNode[index], this.MaxCircle.positionNode[index], this.MinCircle.positionNode[index].progress);
            this.mainZrenderNodes.push(node);

        }
    }
    public updateProgerss(progress: number) {
        let color = 'white';
        if (progress <= 30) {
            color = 'green';
        } else if (progress <= 70) {
            color = 'yellow'
        } else if (progress > 70) {
            color = 'red';
        }
        this.mainZrenderNodes.forEach(d => {
            d.mainZrender.attr('style', {
                stroke: 'white'
            })
        });
        const list = this.mainZrenderNodes.filter(d => d.progressId <= progress);
        list.forEach(d => {
            d.mainZrender.attr('style', {
                stroke: color
            })
        });
    }
}
class CircleLineNode {
    public mainZrender: any;
    constructor(startPosition: PositionEqual, endPosition: PositionEqual, public progressId: number) {
        this.mainZrender = new zrender.Line({
            shape: {
                x1: startPosition.PositionX,
                y1: startPosition.PositionY,
                x2: endPosition.PositionX,
                y2: endPosition.PositionY
            },
            style: {
                stroke: 'white',
                lineWidth: 1

            }
        });
    }
}

class CircleNode {
    private MaxCount = 201;

    public positionNode: PositionEqual[] = [];
    constructor(private R: number, private X: number, private Y: number) {
        let start = 2.1928;
        let end = 0.9578;
        let index = 0;
        const len = (Math.PI * 2 - start + end) / this.MaxCount;
        while (start <= 2 * Math.PI) {
            const pX = this.R * Math.cos(start) + this.X;
            const pY = this.R * Math.sin(start) + this.Y;
            this.positionNode.push(new PositionEqual(pX, pY, index));
            index++;
            start += len;
        }
        start = 0;
        while (start <= end) {
            const pX = this.R * Math.cos(start) + this.X;
            const pY = this.R * Math.sin(start) + this.Y;
            this.positionNode.push(new PositionEqual(pX, pY, index));
            start += len;
            index++;
        }
        console.log(index);
    }
}

class PositionEqual {
    public progress: number;
    constructor(public PositionX: number, public PositionY: number, index: number) {
        this.progress = Math.round(index / 2);
        if (this.progress >= 100) {
            this.progress = 100;
        }
    }
}