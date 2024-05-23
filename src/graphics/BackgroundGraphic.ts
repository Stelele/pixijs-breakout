import { Graphics, GraphicsContext, Texture, Ticker } from "pixi.js";
import { IGraphics } from "../Manager";

export class BackgroundGraphic extends Graphics implements IGraphics {
    constructor() {
        const texture = Texture.from("background")
        const context = new GraphicsContext()
            .texture(texture)

        super(context)
        this.x = 0
        this.y = 0

    }

    update(_ticker: Ticker): void {

    }

}