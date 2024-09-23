import { ClassPc, savingThrows } from "../interfaces"

export function CountSavingThrowFromClassPc(
    classPcList: ClassPc[]): savingThrows {
        let sT: savingThrows = {
            fortitude: 0,
            reflex: 0,
            will: 0
        }
        classPcList.forEach(cl => {
            cl.savingThrow.charAt(0) === 'h'? sT.fortitude += 2.5 : sT.fortitude += 0.5
            cl.savingThrow.charAt(1) === 'h'? sT.reflex += 2.5 : sT.reflex += 0.5
            cl.savingThrow.charAt(2) === 'h'? sT.will += 2.5 : sT.will += 0.5

            sT.fortitude += 0.5 * (cl.level - 1)
            sT.reflex += 0.5 * (cl.level - 1)
            sT.will += 0.5 * (cl.level - 1)

            sT.fortitude = Math.floor(sT.fortitude)
            sT.reflex =  Math.floor(sT.reflex)
            sT.will = Math.floor(sT.will)
        })

        return sT;
    }
export function CountSavingThrowFromAdjClass(
    level: number): savingThrows {

        let sT: savingThrows = {
            fortitude: 0,
            reflex: 0,
            will: 0
        }

            sT.fortitude += 0.5 * (level)
            sT.reflex += 0.5 * (level)
            sT.will += 0.5 * (level)

            sT.fortitude = Math.floor(sT.fortitude)
            sT.reflex =  Math.floor(sT.reflex)
            sT.will = Math.floor(sT.will)

        return sT;
    }