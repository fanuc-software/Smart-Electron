import { IZrenderNode, BaseAssetsNode } from "./zrender-Factory";

export class HomeProgram extends BaseAssetsNode implements IZrenderNode {
    public MainElementNodes: any[] = [];
    private defaultCode = `//CNC_MEM/USER/PATH2 \r\n00002;(postposeror.  \r\n  : \r\n RoboDrill_3Axes_ ;\r\n (operation Name  \r\n this.MainElementNodes.push(group);`;
    private codeZrender: any;
    constructor() {
        super();
        var group = new zrender.Group();
        group.position[0] = 887;
        group.position[1] = 174;
        const mainBg = new zrender.Image({
            style: {
                image: `${this.basePath}/images/code-background.png`,
                width: 423,
                height: 308
            }
        });
        this.codeZrender = new zrender.Text({
            style: {
                y: 100,
                x: 100,
                text: this.defaultCode,
                fontSize: 12,
                fontFamily: 'PingFangSC-Medium',
                textFill: '#82B1C9',
                textAlign: 'left',
                textLineHeight: 17

            }
        });
        group.add(mainBg);
        group.add(this.codeZrender);
        this.MainElementNodes.push(group);
    }
    public refresh(node: any) {
        if (node.fullNamespace == "MMK.SmartSystem.WebCommon.DeviceModel.ReadProgramStrResultModel" && Array.isArray(node.value) && node.value.length > 0) {
            if (node.value[0].id == 'Home-Program') {
                const arrCode = node.value[0].value.split('\n');
                const len = arrCode.length > 10 ? 10 : arrCode.length;
                let code = '';
                for (let index = 0; index < len; index++) {
                    code += arrCode[index] + '\n';

                }
                this.updateCode(code);
            }
        }
    }
    private updateCode(programStr: string) {
        this.codeZrender.attr('style', {
            text: programStr
        })
    }
}