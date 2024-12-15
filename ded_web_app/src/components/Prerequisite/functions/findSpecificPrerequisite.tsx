import { Abilitys } from "../../Abilitys/Interface";
import { SpecialAttacks } from "../../interfaces";
import { Prerequisite } from "../interface/Prerequisite";

export const findAbilitysPrerequisite = (prerList: Prerequisite[]): Abilitys[] => {
    let onlyAbilitys: Abilitys[] = [];

    prerList.forEach(prer => {
        if (prer.abilitys !== null) onlyAbilitys.push(prer.abilitys)
    })

    return onlyAbilitys;
}

export const findSpecialAttacksPrerequisite = (
    prerList: Prerequisite[]
): SpecialAttacks[] => {
    let onlySpecialAttacks: SpecialAttacks[] = [];

    prerList.forEach(prer => {
        if (prer.specialAttacks !== null) onlySpecialAttacks.push(prer.specialAttacks)
    })

    return onlySpecialAttacks;
}