import { BitmapText, Container, Ticker } from "pixi.js";
import { IScene, Manager } from "../Manager";
import { LargeFont, MediumFont } from "../graphics";
import { InputManager } from "../InputManager";
import { Sound } from "@pixi/sound";

export class StartScene extends Container implements IScene {
    public assetBundles = ["fonts", "start-scene"]
    public assetsReady: boolean;

    private titleText!: BitmapText
    private startText!: BitmapText
    private highScoreText!: BitmapText
    private _sounds!: Record<string, Sound>

    private _selection = 0
    public get selection() { return this._selection === 0 ? this.startText.text : this.highScoreText.text }
    public get sounds() { return this._sounds }

    constructor() {
        super()
        this._sounds = {}
        this.assetsReady = false
    }

    public constructorWithAssets() {
        this.titleText = new BitmapText({ text: "Breakout", style: LargeFont(false) })
        this.titleText.x = (Manager.width / 2) - (this.titleText.width / 2)
        this.titleText.y = 20
        this.addChild(this.titleText)

        this.startText = new BitmapText({ text: "START", style: MediumFont(true) })
        this.startText.x = (Manager.width / 2) - (this.startText.width / 2)
        this.startText.y = Manager.height - this.startText.height - 80
        this.addChild(this.startText)

        this.highScoreText = new BitmapText({ text: "HIGH SCORES", style: MediumFont(false) })
        this.highScoreText.x = (Manager.width / 2) - (this.highScoreText.width / 2)
        this.highScoreText.y = this.startText.y + this.startText.height + 20
        this.addChild(this.highScoreText)

        this.sounds["select"] = Sound.from("sounds/select.wav")
        this.sounds["confirm"] = Sound.from("sounds/confirm.wav")

        this.assetsReady = true
    }

    public update(_ticker: Ticker): void {
        if (InputManager.keysPressed["ArrowUp"]) {
            this._selection = Math.abs((this._selection - 1) % 2)
            this.sounds["select"].play()
        }

        if (InputManager.keysPressed["ArrowDown"]) {
            this._selection = (this._selection + 1) % 2
            this.sounds["select"].play()
        }

        this.startText.style = MediumFont(this._selection === 0)
        this.highScoreText.style = MediumFont(this._selection === 1)
    }

    public destroyAssets(): void {
        this.removeChild(this.titleText, this.startText, this.highScoreText)
        this.titleText.destroy()
        this.startText.destroy()
        this.highScoreText.destroy()
    }

}