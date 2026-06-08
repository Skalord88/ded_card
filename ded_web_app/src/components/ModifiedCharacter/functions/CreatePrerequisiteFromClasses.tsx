import { ClassPc } from "../../ClassPc/Interface/ClassPcLevel";
import { FormattingText } from "../../Formatting/Function";
import { ModifierBonus } from "../../Prerequisite/interface/ModifierBonus";
import {
  FORTITUDE_MODIFIER,
  ModifierEnum,
  REFLEX_MODIFIER,
  WILL_MODIFIER
} from "../../Prerequisite/interface/ModifierEnum";
import { Prerequisite } from "../../Prerequisite/interface/Prerequisite";

export const createPrerequisiteFromClasses = (
  allPrerequisite: Prerequisite[],
  classPcList: ClassPc[],
  consolog?: boolean
): Prerequisite[] => {
  const returnSaving = (save: string, level: number): number => {
    return save === "h" ? 2.5 + (level - 1) * 0.5 : 0 + (level - 1) * 0.75;
  };

  const prerequisiteClass: Prerequisite[] = classPcList.map((cl) => {
    const className: string = FormattingText(cl.classCharacter.className);
    const save: string = cl.classCharacter.savingThrow;
    const saves: ModifierBonus[] = [
      {
        // modifier: { text: className + " Fortitude Saving Throw" } as ModifierEnum
        modifier: FORTITUDE_MODIFIER
        , bonus: returnSaving(save[0], cl.level)
        , modifierType: { text: className } as ModifierEnum,
        target: [FORTITUDE_MODIFIER]
        // , modifierType: FORTITUDE_MODIFIER
      },
      {
        // modifier: { text: className + " Reflex Saving Throw" } as ModifierEnum
        modifier: REFLEX_MODIFIER
        , bonus: returnSaving(save[1], cl.level)
        , modifierType: { text: className } as ModifierEnum
        , target: [REFLEX_MODIFIER]
        // , modifierType: REFLEX_MODIFIER
      },
      {
        // modifier: { text: className + " Will Saving Throw" } as ModifierEnum
        modifier: WILL_MODIFIER
        , bonus: returnSaving(save[2], cl.level)
        , modifierType: { text: className } as ModifierEnum
        , target: [WILL_MODIFIER]
        // , modifierType: WILL_MODIFIER
      }
    ];
    return {
      id: -1,
      attackRoll: [
        {
          bonus: cl.classCharacter.classBab * cl.level,
          modifierType: { text: className } as ModifierEnum
        }
      ],
      savingThrow: saves,
      text: className + " modifiers"
    };
  });
  // console.log("prerequisiteClass", prerequisiteClass)
  return [...prerequisiteClass, ...allPrerequisite];
};
