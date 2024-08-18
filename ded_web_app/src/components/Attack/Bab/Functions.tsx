import { CharacterPc } from "../../interfaces";

export function CountBabFromClassPc(
    char: CharacterPc): number {
  
      const babFromClass: number = Math.floor(char.classPcList.reduce(
    (total, cl) => 
        total + cl.classBab * cl.level, 0));

    return babFromClass + char.race.size.bonus
}
