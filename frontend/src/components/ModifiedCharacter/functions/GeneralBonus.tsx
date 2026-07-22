import { AllModifiers, ModifierResult } from "../interface/ModifiedCharacter";

export const generalBonus = (modifiersMap: AllModifiers): number => {
  return Object.values(modifiersMap).reduce((sum, mod) => {
    const modifierResult = mod as ModifierResult;

    return (
      sum +
      (modifierResult.sources || []).reduce((innerSum, source) => {
        if (!source.targets || source.targets.length === 0) {
          return innerSum + (source.bonus || 0);
        }
        return innerSum;
      }, 0)
    );
  }, 0);
};
