import { Modifiers } from "../ModifierInterface"

export function SkillBonusModification(modifications: Modifiers[], idSkill: number): [number, string] {

    const mod = modifications.find((mod) => mod.modifier === "SKILL");
        switch(mod?.targets.length) {
            case 1: return CountSkillBonusInModification(mod, idSkill)
            case 2: return CountSpecificSkillBonusInModification(mod, idSkill)
        }
    return [0, ""];
}

export function CountSkillBonusInModification
(mod :Modifiers, skillId :number): [number, string] {
    if (Number(mod.targets[0]) === skillId) return [mod.bonus, ""]
    return [0, ""];
}

export function CountSpecificSkillBonusInModification (mod :Modifiers, skillId :number): [number, string] {
    if (Number(mod.targets[0]) === skillId) return [mod.bonus, mod.targets[0]]
    return [0, ""];
}
