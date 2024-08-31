import { CharacterPc } from "../../interfaces";
import { CountBab } from "../../Modifiers/Bab/Function";

export function CountBabFromClassPc(
    char: CharacterPc): number {
  
      const babFromClass: number = Math.floor(char.classPcList.reduce(
    (total, cl) => 
        total + cl.classBab * cl.level, 0));

    return babFromClass + CountBab(char);
}
