import { Ticker } from "pixi.js";
import { IState } from "./BaseState";
import { PlayScene } from "../../scenes";
import { Manager } from "../../Manager";

export class PlayState implements IState {
    private playScene!: PlayScene

    public enter() {
        this.playScene = new PlayScene()
        Manager.changeScene(this.playScene)
    }

    public exit() {
        this.playScene.destroyAssets()
    }

    public update(ticker: Ticker) {
        if (!this.playScene.assetsReady) return
        this.playScene.update(ticker)
    }

}