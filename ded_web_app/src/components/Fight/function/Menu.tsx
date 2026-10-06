// export const indexInPositionInMenuAFight = (clickIndex: number): string => {
//     switch(clickIndex){
//         case 0: return "w1"
//         case 1: return "w2"
//         case 2: return "wA"
//         case 3: return "w21"
//         case 4: return "w22"
//         case 5: return "w2A"
//         default: return "empty"
//     }
// }
export const positionInIndexInMenuAFight = (clickIndex: string): number => {
    switch(clickIndex){
        case "w1": return 0
        case "w2": return 1
        case "wA": return 2
        case "w21": return 3
        case "w22": return 4
        case "w2A": return 5
        default: return 0
    }
}
// export const positionInIndexInMenuFight = (clickIndex: string): number => {
//     switch(clickIndex){
//         case "w1": return 0
//         case "w2": return 1
//         case "wA": return 2
//         case "w21": return 3
//         case "w22": return 4
//         case "w2A": return 5
//         default: return 0
//     }
// }
export const indexInPositionInMenuFight = (clickIndex: string): number | string => {
    switch(clickIndex){
        case "B0": return "A"
        case "A": return 0
        case "A0": return "w1"
        case "w1": return 0

        case "B1": return "B"
        case "B": return 1
        case "A1": return "w2"
        case "w2": return 1

        case "B2": return "C"
        case "C": return 2
        case "A2": return "wA"
        case "wA": return 2

        case "B3": return "D"
        case "D": return 3
        case "A3": return "w21"
        case "w21": return 3

        case "B4": return "E"
        case "E": return 4
        case "A4": return "w22"
        case "w22": return 4

        case "B5": return "F"
        case "F": return 5
        case "A5": return "w2A"
        case "w2A": return 5

        default: return 0
    }
}
export const positionInIndexInMenuBFight = (clickIndex: string): number => {
    switch(clickIndex){
        case "A": return 0
        case "B": return 1
        case "C": return 2
        case "D": return 3
        case "E": return 4
        case "F": return 5
        default: return 0
    }
}
// export const selectionMenuFight = (clickIndex: number): number => {
//     switch(clickIndex){
//         case 0: return 0
//         default: return 0
//     }
// }