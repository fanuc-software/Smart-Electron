import * as path from 'path';

export interface IZrenderNode {
    MainElementNodes: any[];

}
export class BaseAssetsNode {
    protected basePath: string;
    constructor() {
        this.basePath = './assets';

    }
}