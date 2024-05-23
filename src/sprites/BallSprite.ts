import { Sprite, Spritesheet, SpritesheetData, Texture, Ticker } from "pixi.js";
import { IGraphics, Manager } from "../Manager";
import { randomNum, range } from "../helpers";
import { Sound } from "@pixi/sound";

export type IBallSkin = 0 | 1 | 2 | 3 | 4 | 5 | 6
export class BallSprite extends Sprite implements IGraphics {
    private spriteSheet: Spritesheet
    private skin: IBallSkin

    public dx: number
    public dy: number

    private _assetsReady: boolean
    private _sounds: Record<string, Sound>

    public get assetsReady() { return this._assetsReady }
    public get sounds() { return this._sounds }

    constructor(skin: IBallSkin = 0) {
        super()
        this._sounds = {
            "wall_hit": Sound.from("sounds/wall_hit.wav"),
            "paddle_hit": Sound.from("sounds/paddle_hit.wav")
        }
        this.dx = randomNum(-0.2, 0.2) + 0.01
        this.dy = -1 * randomNum(0.1, 0.2)
        this.skin = skin
        this.spriteSheet = new Spritesheet(
            Texture.from("play"),
            this.getSpriteSheetData()
        )

        this.loadTextures()
        this._assetsReady = false
    }

    private async loadTextures() {
        await this.spriteSheet.parse()
        this.texture = this.spriteSheet.textures[`${this.skin}`]
        this._assetsReady = true
    }

    public update(ticker: Ticker): void {
        if (!this.assetsReady) return
        this.position.x += this.dx * ticker.deltaMS
        this.position.y += this.dy * ticker.deltaMS

        if (this.position.x <= 0 || this.position.x + this.width >= Manager.width) {
            this.dx *= -1
            this.x = this.x < Manager.width / 2 ? 2 : Manager.width - this.width - 2
            this.sounds["wall_hit"].play()
        }

        if (this.position.y <= 0) {
            this.dy *= -1
            this.y = 2
            this.sounds["wall_hit"].play()
        }

    }

    private getSpriteSheetData() {
        const spriteSheetData: SpritesheetData = {
            frames: {},
            meta: {
                image: "play",
                format: 'RGBA8888',
                size: { w: 192, h: 256 },
                scale: 0.7
            }
        }

        const baseX = 32 * 3
        const baseY = 16 * 3
        for (const num of range(0, 7)) {
            spriteSheetData.frames[`${num}`] = {
                frame: {
                    x: baseX + ((num * 8) % (4 * 8)),
                    y: baseY + (8 * Math.floor(num / 4)),
                    w: 8,
                    h: 8
                }
            }
        }

        return spriteSheetData
    }

}