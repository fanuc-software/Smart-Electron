import { IZrenderNode } from "./zrender-Factory";

export class HomeSpeed implements IZrenderNode {
    private maxCircleNode: CircleZrenderNode = new CircleZrenderNode();
    public MainElementNodes: any[] = [];
    constructor() {
        const speedBackground = new zrender.Image({
            style: {
                image: '../../../../assets/images/speed-background.png',
                width: 360,
                height: 328,
                x: 500,
                y: 155
            }
        });
        this.MainElementNodes.push(speedBackground);
        this.maxCircleNode.mainZrenderNodes.forEach(d => this.MainElementNodes.push(d));
    }

}





class CircleZrenderNode {
    public mainZrenderNodes: any[] = [];
    private MinCircle: CircleNode;
    private MaxCircle: CircleNode;
    constructor() {
        this.MinCircle = new CircleNode(194, 683, 335);
        this.MaxCircle = new CircleNode(210, 683, 335);
        this.Build();
    }

    private Build() {
        const maxLen = this.MinCircle.positionNode.length;
        for (let index = 0; index < maxLen; index++) {

            const node = this.BuildNode(this.MinCircle.positionNode[index], this.MaxCircle.positionNode[index]);
            this.mainZrenderNodes.push(node);

        }
    }
    private BuildNode(startPosition: PositionEqual, endPosition: PositionEqual): any {
        return new zrender.Line({
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
    private MaxCount = 200;

    public positionNode: PositionEqual[] = [];
    constructor(private R: number, private X: number, private Y: number) {
        for (let index = 0; index < this.MaxCount; index++) {
            const pX = this.R * Math.cos(index * 2 * Math.PI / this.MaxCount) + this.X;
            const pY = this.R * Math.sin(index * 2 * Math.PI / this.MaxCount) + this.Y;
            this.positionNode.push(new PositionEqual(pX, pY));
        }
    }
}

class PositionEqual {
    constructor(public PositionX: number, public PositionY: number) {

    }
}