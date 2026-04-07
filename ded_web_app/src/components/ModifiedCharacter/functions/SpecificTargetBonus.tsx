import {
    AllModifiers,
    BonusResult,
    ModifierResult,
    ModifierTarget
} from "../interface/ModifiedCharacter";

export const specificTargetBonusNumber = (
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

export const specificTargetBonusList = (
  targetText: string,
  modifiersMap: AllModifiers
): AllModifiers => {
  const hasTarget = (targets: any[]): boolean => {
    return targets.some((t) => {
      if (typeof t === "string") return t === targetText;
      if (Array.isArray(t)) return false;
      if (typeof t === "object") return t.text === targetText;
      return false;
    });
  };

  return Object.entries(modifiersMap).reduce((acc, [key, value]) => {
    const modifier = value as ModifierResult;

    const filteredSources = (modifier.sources || []).filter((source) =>
      hasTarget(source.targets || [])
    );

    if (filteredSources.length > 0) {
      acc[key] = {
        ...modifier,
        sources: filteredSources
      };
    }

    return acc;
  }, {} as AllModifiers);
};

const isModifierResult = (value: any): value is ModifierResult => {
  return (
    value &&
    typeof value === "object" &&
    "sources" in value &&
    Array.isArray(value.sources)
  );
};

const matchTarget = (
  targets: ModifierTarget[] | undefined,
  targetText?: string
): boolean => {
  if (!targets) return false;

  return targets.some((t) => {
    if (typeof t === "string") return t === targetText;

    if (Array.isArray(t)) return false;

    if (typeof t === "object" && "text" in t) {
      return (t as any).text === targetText;
    }

    return false;
  });
};

export const getBonusList = (
  modifiersMap: AllModifiers,
  options?: {
    targetText?: string;
    includeOnlyWithTarget?: boolean;
  }
): BonusResult[] => {
  return Object.entries(modifiersMap).flatMap(([key, value]) => {
    if (!isModifierResult(value)) return [];

    const sources = value.sources || [];

    const filtered = sources.filter((source) => {
      // ✅ SOLO presenza di target
      if (options?.includeOnlyWithTarget) {
        return source.targets && source.targets.length > 0;
      }

      // ✅ target specifico
      if (options?.targetText) {
        return matchTarget(source.targets, options.targetText);
      }

      // ✅ default: senza target
      return !source.targets || source.targets.length === 0;
    });

    const total = filtered.reduce(
      (sum, source) => sum + (source.bonus || 0),
      0
    );

    return filtered.length > 0 ? [{key, bonus: total, targets: 
      filtered.map((t) => t.targets)
    }] : total !== 0 ? [{ key, bonus: total }] : [];
  });
};

