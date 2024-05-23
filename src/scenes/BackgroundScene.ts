import { Container, Ticker } from "pixi.js";
import { IScene } from "../Manager";
import { BackgroundGraphic } from "../graphics";

export class BackgroundScene extends Container implements IScene {
    public assetBundles: string[] = ["background-scene"]
    public assetsReady: boolean;

    private background!: BackgroundGraphic;

    constructor() {
        super()
        this.assetsReady = false
    }

    public destroyAssets(): void {
        this.removeChild(this.background)
        this.background.destroy()
    }

    public constructorWithAssets(): void {
        this.background = new BackgroundGraphic()
        this.addChild(this.background)
        this.assetsReady = true
    }


    public update(ticker: Ticker): void {
        this.background.update(ticker)
    }

}