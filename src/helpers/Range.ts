export function* range(start: number, end: number, step = 1) {
    let iterationCount = 0
    for (let i = start; i < end; i += step) {
        iterationCount++
        yield i
    }

    return iterationCount
}