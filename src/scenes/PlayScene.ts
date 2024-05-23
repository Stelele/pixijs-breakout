import { Container, Ticker } from "pixi.js";
import { IScene, Manager } from "../Manager";
import { BallSprite, PaddleSprite } from "../sprites";
import { isCollision, randomNum } from "../helpers";

export class PlayScene extends Container implements IScene {
    public assetBundles = ["play-scene"]
    public assetsReady: boolean;

    private _paddleSprite!: PaddleSprite
    private _ballSprite!: BallSprite

    public get paddleSprite() { return this._paddleSprite }
    public get ballSprite() { return this._ballSprite }

    constructor() {
        super()
        this.assetsReady = false
    }

    public constructorWithAssets(): void {
        this._paddleSprite = new PaddleSprite(0, "B")
        this.addChild(this._paddleSprite)

        this._ballSprite = new BallSprite()
        this.addChild(this._ballSprite)

        this.positionAssets()
    }

    private positionAssets() {
        if (!this.paddleSprite.assetsReady || !this.ballSprite.assetsReady) {
            setTimeout(this.positionAssets.bind(this))
            return
        }

        this._paddleSprite.x = (Manager.width / 2) - (this._paddleSprite.width / 2)
        this._paddleSprite.y = Manager.height - this._paddleSprite.height - 20

        this._ballSprite.x = this.paddleSprite.x + (this.paddleSprite.width / 2) - (this.ballSprite.width / 2)
        this._ballSprite.y = this.paddleSprite.y - this.ballSprite.height

        this.assetsReady = true
    }

    public update(ticker: Ticker): void {
        if (!this.assetsReady) return
        this._paddleSprite.update(ticker)
        this._ballSprite.update(ticker)

        if (isCollision(this.paddleSprite, this.ballSprite)) {
            this.ballSprite.dy *= -1
            this.ballSprite.y = this.paddleSprite.y - this.ballSprite.height - 2
            this.ballSprite.dx = this.ballSprite.dx > 0 ? randomNum(0.1, 0.2) : randomNum(-0.2, -0.1)
            this.ballSprite.sounds["paddle_hit"].play()
        }
    }

    public destroyAssets(): void {
        this.removeChild(this._paddleSprite)
        this._paddleSprite.destroy()
    }

}