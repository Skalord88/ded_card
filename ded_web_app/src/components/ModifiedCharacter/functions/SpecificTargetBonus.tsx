import {
    AllModifiers
} from "../interface/ModifiedCharacter";

export const specificTargetBonus = (
  targetText: string,
  modifiersMap: AllModifiers
): number => {
  const hasTarget = (targets: any[]): boolean => {
    return targets.some((t) => {
      if (typeof t === "string") return t === targetText;
      if (Array.isArray(t)) return false;
      if (typeof t === "object") return t.text === targetText;
      return false;
    });
  };

  return Object.values(modifiersMap)
    .flatMap((entry: any) => entry.sources || [])
    .filter((source: any) => hasTarget(source.targets || []))
    .reduce((sum: number, source: any) => sum + (source.bonus || 0), 0);
};
