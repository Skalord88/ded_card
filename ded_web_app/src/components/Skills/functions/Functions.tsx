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

export function IsHide(skill: string): boolean {
    return skill === 'hide' || skill === 'HIDE'|| skill === 'Hide'? true : false
}