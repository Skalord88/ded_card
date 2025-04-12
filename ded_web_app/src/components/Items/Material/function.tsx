export enum MaterialItem {
  MITHRAL = "MITHRAL",
  DARKWOOD = "DARKWOOD",
  ADAMANTINE = "ADAMANTINE",
  METAL = "METAL",
  WOOD = "WOOD",
  LEATHER = "LEATHER",
  DRAGONSKIN = "DRAGONSKIN"
}

export const reMaterialArmType = (
  material: string,
  armorType: string
): string => {
  if (material) {
    if (material === "MITHRAL") {
      return armorType === "MEDIUM_ARMOR"
        ? "LIGHT_ARMOR"
        : armorType === "HEAVY_ARMOR"
        ? "MEDIUM_ARMOR"
        : armorType;
    }
  }
  return armorType;
};

export const reMaterialWeight = (
  material: string | null,
  weight: number
): number => {
  const specialMat: string[] = ["MITHRAL", "DARKWOOD"];
  if (material) {
    if (specialMat.includes(material)) {
      return weight / 2;
    }
  }
  return weight;
};

export const reMaterialPerfectPenality = (
  material: string | null,
  penality: number,
  perfect: boolean
): number => {
  const specialMat: boolean = material ? ["MITHRAL", "DARKWOOD"].includes(material) : false;
  const normalMat: boolean = material ? ["WOOD", "LEATHER", "METAL"].includes(material) : false;
  const prf: number = perfect ? 1 : 0;

  const bonus: number = specialMat? 2 + prf : normalMat ? prf : prf
  return penality + bonus > 0 ? 0 : penality + bonus;
};

export const reMaterialMaxDex = (
  material: string | null,
  maxDex: number
): number => {
  if (material) {
    if (material === "MITHRAL") {
      return maxDex + 3 < 100 ? maxDex + 3 : 100;
    }
  }
  return maxDex;
};
export const reMaterialFailure = (
  material: string | null,
  failure: number
): number => {
  if (material) {
    if (material === "MITHRAL") {
      return failure - 10 < 0 ? 0 : failure - 10;
    }
  }
  return failure;
};
