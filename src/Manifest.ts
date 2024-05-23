import { AssetsManifest } from "pixi.js"

export const manifest: AssetsManifest = {
    bundles: [
        {
            name: "background-scene",
            assets: {
                "background": "images/background.jpg",
                "wall_hit": "sounds/wall_hit.wav",
                "paddle_hit": "sounds/paddle_hit.wav"
            }
        },
        {
            name: "play-scene",
            assets: {
                "play": "images/breakout.png"
            }
        },
        {
            name: "start-scene",
            assets: [
                { alias: "confirm", src: "sounds/confirm.wav" },
                { alias: "select", src: "sounds/select.wav" }
            ]
        },
        {
            name: "fonts",
            assets: [
                { alias: "Breakout", src: "fonts/breakout.ttf" }
            ]
        }
    ]
}