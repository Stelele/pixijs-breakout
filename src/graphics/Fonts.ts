import { TextStyleOptions } from "pixi.js";

export const SmallFont = (isSelected = false): TextStyleOptions => ({ fontFamily: "Breakout", fontSize: 32, fill: isSelected ? 0x67ffff : 0xffffff })
export const MediumFont = (isSelected = false): TextStyleOptions => ({ fontFamily: "Breakout", fontSize: 50, fill: isSelected ? 0x67ffff : 0xffffff })
export const LargeFont = (isSelected = false): TextStyleOptions => ({ fontFamily: "Breakout", fontSize: 60, fill: isSelected ? 0x67ffff : 0xffffff })