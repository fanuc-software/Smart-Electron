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
                y: 120,
                x: 80,
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

    public updateCode(programStr: string) {
        this.codeZrender.attr('style', {
            text: programStr
        })
    }
}