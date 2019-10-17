import { IZrenderNode } from "./zrender-Factory";

export class HomeModal implements IZrenderNode {
    private positon = { x: 784, y: 602 };
    public MainElementNodes: any[] = [];
    private leftProgram: ProgramZrenderNode;
    private rightProgram: ProgramZrenderNode;
    private pcNode: CodeZrenderNode;
    private frNode: CodeZrenderNode;
    private duNode: CodeZrenderNode;
    private paNode: CodeZrenderNode;
    constructor() {
        var group = new zrender.Group();
        group.position[0] = this.positon.x;
        group.position[1] = this.positon.y;

        const bg = new zrender.Image({
            style: {
                image: '../../../../assets/images/bg-big-position.png',
                width: 538,
                height: 82,
                x: 0,
                y: 20,

            }
        });
        this.leftProgram = new ProgramZrenderNode(this.positon.x + 5, this.positon.y, '000000', '');
        this.rightProgram = new ProgramZrenderNode(this.positon.x + 360, this.positon.y, 'N', '00000000');
        this.pcNode = new CodeZrenderNode(this.positon.x + 30, this.positon.y + 50, 'Pc', '10000');
        this.frNode = new CodeZrenderNode(this.positon.x + 180, this.positon.y + 50, 'Fr', '100');
        this.duNode = new CodeZrenderNode(this.positon.x + 300, this.positon.y + 50, 'Du', '100');
        this.paNode = new CodeZrenderNode(this.positon.x + 420, this.positon.y + 50, 'Pa', '100');
        group.add(bg);
        this.MainElementNodes.push(group);
        this.MainElementNodes.push(this.leftProgram.programZrender);
        this.MainElementNodes.push(this.rightProgram.programZrender);
        this.MainElementNodes.push(this.pcNode.codeZrender);
        this.MainElementNodes.push(this.frNode.codeZrender);
        this.MainElementNodes.push(this.duNode.codeZrender);
        this.MainElementNodes.push(this.paNode.codeZrender);
    }
}

class CodeZrenderNode {

    public codeZrender: any;
    private valueZrender: any;
    constructor(private x: number, private y: number,
        private title: string, public value: string) {
        this.codeZrender = new zrender.Group();
        this.codeZrender.position[0] = this.x;
        this.codeZrender.position[1] = this.y;
        const zrenderTitle = new zrender.Text({
            style: {
                text: this.title,
                fontSize: 44,
                fontFamily: 'DINCondensed-Bold',
                textFill: '#DFA03D',
            }
        });
        this.valueZrender = new zrender.Text({
            style: {
                text: this.value,
                fontSize: 44,
                fontFamily: 'DINCondensed-Bold',
                textFill: '#B4B4B4',
                x: 40
            }
        });
        this.codeZrender.add(this.valueZrender);
        this.codeZrender.add(zrenderTitle);
    }

    public updateValue(newValue: string) {
        this.valueZrender.attr('style', {
            text: newValue
        })
    }
}

class ProgramZrenderNode {
    public programZrender: any;
    private programNumber: any;
    constructor(private x: number, public y: number, public title: string, public value: string) {
        this.programZrender = new zrender.Group();
        this.programZrender.position[0] = this.x;
        this.programZrender.position[1] = this.y;
        const zrenderTitle = new zrender.Text({
            style: {
                text: this.title,
                fontSize: 24,
                fontFamily: 'PingFangSC-Medium',
                textFill: '#B2B2B2',
            }
        });

        this.programNumber = new zrender.Text({
            style: {
                text: this.value,
                x: 50,
                fontSize: 24,
                fontFamily: 'PingFangSC-Medium',
                textFill: '#B2B2B2',
            }
        });
        this.programZrender.add(zrenderTitle);
        this.programZrender.add(this.programNumber);
    }

    public updateValue(newValue: string) {
        this.programNumber.attr('style', {
            text: newValue
        });
    }
}