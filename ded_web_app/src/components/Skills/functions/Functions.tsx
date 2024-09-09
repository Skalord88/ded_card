import { ClassPc } from "../../interfaces";

export function SkillPointsFromClass(classList: ClassPc[]): number {
    return classList.reduce(
        (total, cl) =>
            cl.firstClass?
                total + (cl.skillPoints*4)
        : total + cl.skillPoints
        ,0
    )
}