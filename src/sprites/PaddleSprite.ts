import { Sprite, Spritesheet, SpritesheetData, SpritesheetFrameData, Texture, Ticker } from "pixi.js";
import { IGraphics, Manager } from "../Manager";
import { range } from "../helpers";
import { InputManager } from "../InputManager";

export type IPaddleSkin = 0 | 1 | 2 | 3
export type IPaddleSize = "A" | "B" | "C" | "D"
export class PaddleSprite extends Sprite implements IGraphics {
    public assetsReady: boolean

    private readonly PADDLE_SPEED = 0.6

    private spriteSheet: Spritesheet
    private skin: IPaddleSkin
    private size: IPaddleSize


    constructor(skin: IPaddleSkin = 0, size: IPaddleSize = "A") {
        super()
        this.assetsReady = false

        this.skin = skin
        this.size = size

        this.spriteSheet = new Spritesheet(
            Texture.from("play"),
            this.getSpriteSheetData()
        )

        this.loadTextures()
    }

    private async loadTextures() {
        await this.spriteSheet.parse()
        this.texture = this.spriteSheet.textures[`skin${this.skin}${this.size}`]
        this.assetsReady = true
    }

    public update(ticker: Ticker): void {
        if (!this.assetsReady) return

        const dx = this.PADDLE_SPEED * ticker.deltaMS
        if (InputManager.keysPressed["ArrowLeft"]) {
            this.position.x = Math.max(0, this.position.x - dx)
        }

        if (InputManager.keysPressed["ArrowRight"]) {
            this.position.x = Math.min(Manager.width - this.width, this.position.x + dx)
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

        for (const skin of range(0, 4)) {
            const baseY = (16 * 4) + (skin * 2 * 16)
            const baseWidth = 32
            const height = 16
            const firstSize: SpritesheetFrameData = {
                frame: { x: 0, y: baseY, w: baseWidth, h: height },
            }
            const secondSize: SpritesheetFrameData = {
                frame: { x: 32, y: baseY, w: baseWidth * 2, h: height },
            }
            const thirdSize: SpritesheetFrameData = {
                frame: { x: 96, y: baseY, w: baseWidth * 3, h: height },
            }
            const forthSize: SpritesheetFrameData = {
                frame: { x: 0, y: baseY + 16, w: baseWidth * 4, h: height },
            }

            spriteSheetData.frames[`skin${skin}A`] = firstSize
            spriteSheetData.frames[`skin${skin}B`] = secondSize
            spriteSheetData.frames[`skin${skin}C`] = thirdSize
            spriteSheetData.frames[`skin${skin}D`] = forthSize
        }

        return spriteSheetData
    }

}