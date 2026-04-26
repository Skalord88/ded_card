import { SignNumber } from "../functions"

export const signAndCountString = (
    numbers: number[],
    floor?: boolean
): string => {
    const num: number = numbers.reduce(
        (total, n) => total + n,
        0
    )

    return SignNumber(num) + (floor ? Math.floor(num) : num)
}