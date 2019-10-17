import { IZrenderNode } from "./zrender-Factory";

export class HomeState implements IZrenderNode {
    public MainElementNodes: any[] = [];
    private mainBg: any;
    constructor() {
        this.mainBg = new zrender.Image({
            style: {
                image: '../../../../assets/images/green.gif',
                width: 240,
                height: 20,
                x: 200
            }
        });
        this.MainElementNodes.push(this.mainBg);
    }

    public updateState(state: string) {
        this.mainBg.attr('style', {
            image: `../../../../assets/images/${state}.gif`
        });
    }
}