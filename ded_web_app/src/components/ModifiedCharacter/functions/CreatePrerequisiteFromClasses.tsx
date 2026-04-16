import { ClassPc } from "../../ClassPc/Interface/ClassPcLevel";
import { FormattingText } from "../../Formatting/Function";
import { ModifierEnum } from "../../Prerequisite/interface/ModifierEnum";
import { Prerequisite } from "../../Prerequisite/interface/Prerequisite";

export const createPrerequisiteFromClasses = (
    allPrerequisite: Prerequisite[],
    classPcList: ClassPc[]
): Prerequisite[] => {

    const returnSaving = (save: string, level: number): number => {
        // const actualSave = saveAll[save]
        return save === "h"? 2.5 + ((level - 1) * 0.5) : 0 + ((level - 1) * 0.75)
    }


    const prerequisiteClass: Prerequisite[] = classPcList.map((cl) => {
        const className: string = FormattingText(cl.classCharacter.className)
        const save: string = cl.classCharacter.savingThrow
        return (
        {
            id: -1,
            attackRoll: [{
                bonus: cl.classCharacter.classBab * cl.level,
                modifierBonus: { text: className } as ModifierEnum
            }],
            savingThrow: [
                {
                    fortitude: returnSaving(save[0], cl.level),
                    reflex: returnSaving(save[1], cl.level),
                    will: returnSaving(save[2], cl.level)
                }
            ],
            text: className + " modifiers"
        }
    )})
    return [...allPrerequisite, ...prerequisiteClass];
}