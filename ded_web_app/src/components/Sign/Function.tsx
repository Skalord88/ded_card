import { SignNumber } from "../functions"

export const signAndCountString = (
    numbers: number[]
): string => {
    const num: number = numbers.reduce(
        (total, n) => total + n,
        0
    )

    return SignNumber(num) + num
}