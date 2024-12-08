import { ClassPc } from "../../ClassPc/Interface/ClassPcLevel";

export function SkillPointsFromClass(classList: ClassPc[]): number {
    return classList.reduce(
        (total, cl) =>
            cl.firstClass?
                total + (cl.classCharacter.skillPoints*4)
        : total + cl.classCharacter.skillPoints
        ,0
    )
}