import { ClassPc } from "../ClassPc/Interface/ClassPcLevel";
import { savingThrows } from "../interfaces";

export function CountSavingThrowFromClassPc(
  classPcList: ClassPc[]
): savingThrows {
  let sT: savingThrows = {
    fortitude: 0,
    reflex: 0,
    will: 0
  };

  classPcList.forEach((cl) => {
    cl.classCharacter.savingThrow.charAt(0) === "h"
      ? (sT.fortitude += 2.5)
      : (sT.fortitude += 0.5);
    cl.classCharacter.savingThrow.charAt(1) === "h" ? (sT.reflex += 2.5) : (sT.reflex += 0.5);
    cl.classCharacter.savingThrow.charAt(2) === "h" ? (sT.will += 2.5) : (sT.will += 0.5);

    sT.fortitude += 0.5 * (cl.level - 1);
    sT.reflex += 0.5 * (cl.level - 1);
    sT.will += 0.5 * (cl.level - 1);
  });

  return sT;
}
export function CountSavingThrowFromAdjClass(level: number): savingThrows {
  const sTAdjCl: number = Math.floor(0.5 * level);

  return {
    fortitude: sTAdjCl,
    reflex: sTAdjCl,
    will: sTAdjCl
  };
}
