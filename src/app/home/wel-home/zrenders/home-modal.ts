import { IZrenderNode, BaseAssetsNode } from "./zrender-Factory";

export class HomeModal extends BaseAssetsNode implements IZrenderNode {
    private positon = { x: 784, y: 602 };
    public MainElementNodes: any[] = [];
    private leftProgram: ProgramZrenderNode;
    private rightProgram: ProgramZrenderNode;
    private pcNode: CodeZrenderNode;
    private frNode: CodeZrenderNode;
    private duNode: CodeZrenderNode;
    private paNode: CodeZrenderNode;

    private macroNodes: CodeZrenderNode[] = [];
    constructor() {
        super();
        var group = new zrender.Group();
        group.position[0] = this.positon.x;
        group.position[1] = this.positon.y;

        const bg = new zrender.Image({
            style: {
                image: `${this.basePath}/images/bg-big-position.png`,
                width: 538,
                height: 82,
                x: 0,
                y: 20,

            }
        });
        this.leftProgram = new ProgramZrenderNode(this.positon.x + 5, this.positon.y, '000000', '');
        this.rightProgram = new ProgramZrenderNode(this.positon.x + 360, this.positon.y, 'N', '00000000');
        this.pcNode = new CodeZrenderNode(this.positon.x + 30, this.positon.y + 50, 'Pc', '000', 3, 'Home-macroPc');
        this.frNode = new CodeZrenderNode(this.positon.x + 150, this.positon.y + 50, 'Fr', '000', 3, 'Home-macroFr');
        this.duNode = new CodeZrenderNode(this.positon.x + 270, this.positon.y + 50, 'Du', '000', 3, 'Home-macroDu');
        this.paNode = new CodeZrenderNode(this.positon.x + 390, this.positon.y + 50, 'Pa', '000', 3, 'Home-macroPa');
        this.macroNodes.push(this.pcNode);
        this.macroNodes.push(this.frNode);
        this.macroNodes.push(this.duNode);
        this.macroNodes.push(this.paNode);
        group.add(bg);
        this.MainElementNodes.push(group);
        this.MainElementNodes.push(this.leftProgram.programZrender);
        this.MainElementNodes.push(this.rightProgram.programZrender);
        this.MainElementNodes.push(this.pcNode.codeZrender);
        this.MainElementNodes.push(this.frNode.codeZrender);
        this.MainElementNodes.push(this.duNode.codeZrender);
        this.MainElementNodes.push(this.paNode.codeZrender);


    }
    public refresh(node: any) {
        this.updateCode(node);
        this.updateProgram(node);
    }
    private updateProgram(node: any) {
        if (node.fullNamespace === 'MMK.SmartSystem.WebCommon.DeviceModel.ReadProgramBlockResultModel' && Array.isArray(node.value) && node.value.length > 0) {
            if (node.value[0].id === 'Home-ProgramBlock') {
                this.rightProgram.updateValue(node.value[0].valueStr);
            }
        }
        if (node.fullNamespace === 'MMK.SmartSystem.WebCommon.DeviceModel.ReadProgramNameResultModel' && Array.isArray(node.value) && node.value.length > 0) {
            if (node.value[0].id === 'Home-ProgramName') {
                this.leftProgram.updateTitle(node.value[0].value.name);
            }
        }

    }
    private updateCode(node: any) {
        if (node.fullNamespace === 'MMK.SmartSystem.WebCommon.DeviceModel.ReadMacroResultItemModel' && Array.isArray(node.value)) {
            node.value.forEach(item => {
                const find = this.macroNodes.filter(d => d.id == item.id);
                if (find && find.length > 0) {
                    const temp = Number.parseInt(item.value + '', 10);
                    const update = (Array(find[0].len).join('0') + temp).slice(-find[0].len);

                    find[0].updateValue(update);
                }
            });
        }


    }
}

class CodeZrenderNode {

    public codeZrender: any;
    private valueZrender: any;
    private zrenderTitle: any;
    constructor(private x: number, private y: number,
        private title: string, public value: string, public len: number, public id: string) {
        this.codeZrender = new zrender.Group();
        this.codeZrender.position[0] = this.x;
        this.codeZrender.position[1] = this.y;
        this.zrenderTitle = new zrender.Text({
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
        this.codeZrender.add(this.zrenderTitle);
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
    private zrenderTitle: any;
    constructor(private x: number, public y: number, public title: string, public value: string) {
        this.programZrender = new zrender.Group();
        this.programZrender.position[0] = this.x;
        this.programZrender.position[1] = this.y;
        this.zrenderTitle = new zrender.Text({
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
        this.programZrender.add(this.zrenderTitle);
        this.programZrender.add(this.programNumber);
    }

    public updateValue(newValue: string) {
        this.programNumber.attr('style', {
            text: newValue
        });
    }
    public updateTitle(newValue: string) {
        this.zrenderTitle.attr('style', {
            text: newValue
        })
    }
}