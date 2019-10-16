export class HomeSpeed {
    private MinCircle: CircleNode;
    private MaxCircle: CircleNode;
    public MainElementNodes: any[] = [];
    constructor() {
        this.MinCircle = new CircleNode(100, 200, 200);
        this.MaxCircle = new CircleNode(150, 200, 200);
        this.Build();
    }

    private Build() {
        const maxLen = this.MinCircle.positionNode.length;
        for (let index = 0; index < maxLen; index++) {

            const node = this.BuildNode(this.MinCircle.positionNode[index], this.MaxCircle.positionNode[index]);
            this.MainElementNodes.push(node);

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
                //fill: '#F00',
                stroke: 'white',
            
                lineWidth: 1,
                // stroke: '#F00',
                // percent: 0
            }
        });
    }
}

export class CircleNode {
    private MaxCount = 100;

    public positionNode: PositionEqual[] = [];
    constructor(private R: number, private X: number, private Y: number) {
        for (let index = 0; index < this.MaxCount; index++) {
            // const pX = this.R * Math.cos(index * 360 / this.MaxCount) + this.X;
            // const pY = this.R * Math.sin(index * 360 / this.MaxCount) + this.Y;
            const pX = this.R * Math.cos(index * 2 * Math.PI / this.MaxCount) + this.X;
            const pY = this.R * Math.sin(index * 2 * Math.PI / this.MaxCount) + this.Y;
            this.positionNode.push(new PositionEqual(pX, pY));
        }
    }
}

export class PositionEqual {
    constructor(public PositionX: number, public PositionY: number) {

    }
}