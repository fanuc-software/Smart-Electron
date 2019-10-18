import { HomeBackground } from "./home-background";
import { HomeSpeed } from "./home-speed";
import { HomePosition } from "./home-position";
import { HomeModal } from "./home-modal";
import { HomeProgram } from "./home-program";
import { HomeAlarm } from "./home-alarm";


export class MainZrenderFactory {
    private background: HomeBackground = new HomeBackground();
    private homeSpeed: HomeSpeed = new HomeSpeed();
    private homePositrion: HomePosition = new HomePosition();
    private homeModal: HomeModal = new HomeModal();
    private homeProgram: HomeProgram = new HomeProgram();
    private homeAlarm: HomeAlarm = new HomeAlarm();
    private mainZrender: any;
    constructor(mainElement: HTMLElement) {
        this.mainZrender = zrender.init(mainElement);

    }

    public build() {
        this.background.MainElementNodes.forEach(d => this.mainZrender.add(d));
        this.homePositrion.MainElementNodes.forEach(d => this.mainZrender.add(d));
        this.homeModal.MainElementNodes.forEach(d => this.mainZrender.add(d));
        this.homeProgram.MainElementNodes.forEach(d => this.mainZrender.add(d));
        this.homeAlarm.MainElementNodes.forEach(d => this.mainZrender.add(d));
        this.homeSpeed.MainElementNodes.forEach(d => this.mainZrender.add(d));
    }
}