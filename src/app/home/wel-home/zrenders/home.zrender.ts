import { HomeBackground } from "./home-background";
import { HomeSpeed } from "./home-speed";


export class MainZrenderFactory {
    private background: HomeBackground = new HomeBackground();
    private homeSpeed: HomeSpeed = new HomeSpeed();
    private mainZrender: any;
    constructor(mainElement: HTMLElement) {
        this.mainZrender = zrender.init(mainElement);

    }

    public build() {
        
       // this.mainZrender.add(this.background.background);
        this.homeSpeed.MainElementNodes.forEach(d=>this.mainZrender.add(d));
    }
}