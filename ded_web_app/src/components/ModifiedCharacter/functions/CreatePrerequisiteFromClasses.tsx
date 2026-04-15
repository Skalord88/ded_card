import { ClassPc } from "../../ClassPc/Interface/ClassPcLevel";
import { Prerequisite } from "../../Prerequisite/interface/Prerequisite";

export const createPrerequisiteFromClasses = (
    allPrerequisite: Prerequisite[],
    classPcList: ClassPc[]
): Prerequisite[] => {

    let newClassPrerequisite: Prerequisite = {
        id: -1,
        // attackRoll: []
    }
    classPcList.forEach((cl) => (
        newClassPrerequisite = {...newClassPrerequisite,
            attackRoll: [
                {
                    bonus: cl.classCharacter.classBab * cl.level
                }
            ]
        }
    ))
    allPrerequisite.push(newClassPrerequisite);
    return allPrerequisite;
}