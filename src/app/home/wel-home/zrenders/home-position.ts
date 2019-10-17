import { IZrenderNode } from "./zrender-Factory";

export class HomePosition implements IZrenderNode {
    public MainElementNodes: any[] = [];
    private xNode: PositionZrenderNode;
    private yNode: PositionZrenderNode;
    private zNode: PositionZrenderNode;
    constructor() {
        this.xNode = new PositionZrenderNode(64, 603, 'X', 'positonX', '-5.142');
        this.yNode = new PositionZrenderNode(235, 603, 'Y', 'positonY', '-1000.000');
        this.zNode = new PositionZrenderNode(406, 603, 'Z', 'positonZ', '0.000');

        this.MainElementNodes.push(this.xNode.zrender);
        this.MainElementNodes.push(this.yNode.zrender);
        this.MainElementNodes.push(this.zNode.zrender);

        // setTimeout(() => {
        //     this.xNode.updateValue(123.456);
        // }, 10000);
    }
}


class PositionZrenderNode {
    public zrender: any;
    private fontBg: any;
    constructor(private x: number, private y: number, private title: string, public id: string, public value: string) {
        var group = new zrender.Group();
        group.position[0] = this.x;
        group.position[1] = this.y;
        const rect = new zrender.Rect({
            shape: {
                x: 0,
                y: 0,
                width: 153,
                height: 100
            },
            style: {
                fill: null
            }

        });
        const zrenderTitle = new zrender.Text({
            style: {
                x: 8,
                text: this.title,
                fontSize: 24,
                fontFamily: 'PingFangSC-Medium',
                textFill: '#B2B2B2'
            }
        });
        this.fontBg = new zrender.Image({
            style: {
                image: '../../../../assets/images/bg-position.png',
                width: 171,
                height: 78,
                x: 0,
                y: 20,
                text: this.value,
                fontSize: 44,
                fontFamily: 'DINCondensed-Bold',
                textFill: '#DFA03D',
                textOffset: [0, 10]
            }
        });
        group.add(rect);
        group.add(this.fontBg);
        group.add(zrenderTitle);
        this.zrender = group;
    }

    public updateValue(newValue: string) {
        this.fontBg.attr('style', {
            text: newValue
        })
    }
}