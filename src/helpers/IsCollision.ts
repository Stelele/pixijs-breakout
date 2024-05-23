type IAsset = { x: number; y: number; width: number; height: number }
export function isCollision<T extends IAsset, R extends IAsset>(a: T, b: R) {
    if (a.x > b.x + b.width) return false
    if (b.x > a.x + a.width) return false
    if (a.y > b.y + b.height) return false
    if (b.y > a.y + a.height) return false
    return true
}