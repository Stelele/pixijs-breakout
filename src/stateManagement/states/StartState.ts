import { Ticker } from "pixi.js";
import { IState } from "./BaseState";
import { StartScene } from "../../scenes";
import { Manager } from "../../Manager";
import { InputManager } from "../../InputManager";
import { StateMachine } from "../StateMachine";

export class StartState implements IState {
    private startScene!: StartScene

    public enter() {
        this.startScene = new StartScene()
        Manager.changeScene(this.startScene)
    }

    public exit() {
        this.startScene.destroyAssets()
    }

    public update(ticker: Ticker) {
        if (!this.startScene.assetsReady) return
        this.startScene.update(ticker)

        if (InputManager.keysPressed["Enter"] && this.startScene.selection === "START") {
            this.startScene.sounds["confirm"].play()
            StateMachine.change("play")
        }

        InputManager.reset()
    }

}