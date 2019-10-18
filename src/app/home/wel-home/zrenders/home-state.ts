import { IZrenderNode, BaseAssetsNode } from "./zrender-Factory";

export class HomeState extends BaseAssetsNode implements IZrenderNode {
    public MainElementNodes: any[] = [];
    private mainBg: any;
    constructor() {
        super();
        this.mainBg = new zrender.Image({
            style: {
                image: `${this.basePath}/images/green.gif`,
                width: 240,
                height: 20,
                x: 200
            }
        });
        this.MainElementNodes.push(this.mainBg);
    }

    public updateState(state: string) {
        this.mainBg.attr('style', {
            image: `${this.basePath}/images/${state}.gif`
        });
    }
}

