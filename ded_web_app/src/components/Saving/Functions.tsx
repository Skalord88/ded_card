import { ClassPc } from "../ClassPc/Interface/ClassPcLevel";
import { savingThrows } from "../interfaces";

export function CountSavingThrowFromClassPc(
  classPcList: ClassPc[]
): savingThrows {
  return {
    fortitude: classPcList.reduce(
      (tot, cl) =>
        tot +
        (cl.classCharacter.savingThrow.charAt(0) === "h"
          ? 2.5 + 0.5 * (cl.level - 1)
          : 0 + (1 / 3) * (cl.level - 1)),
      0
    ),
    reflex: classPcList.reduce(
      (tot, cl) =>
        tot +
        (cl.classCharacter.savingThrow.charAt(1) === "h"
          ? 2.5 + 0.5 * (cl.level - 1)
          : 0 + (1 / 3) * (cl.level - 1)),
      0
    ),
    will: classPcList.reduce(
      (tot, cl) =>
        tot +
        (cl.classCharacter.savingThrow.charAt(2) === "h"
          ? 2.5 + 0.5 * (cl.level - 1)
          : 0 + (1 / 3) * (cl.level - 1)),
      0
    )
  };
}
export function CountSavingThrowFromAdjClass(level: number): savingThrows {
  const sTAdjCl: number = Math.floor(1/3 * level);

  return {
    fortitude: sTAdjCl,
    reflex: sTAdjCl,
    will: sTAdjCl
  };
}
