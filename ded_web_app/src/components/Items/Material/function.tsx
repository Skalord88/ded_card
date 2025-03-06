export const reMaterialArmType = (
  material: string | null,
  armorType: string
): string => {
  let newType: string = armorType;
  if (material) {
    if (material === "MITHRAL") {
      newType =
        armorType === "LIGHT_ARMOR"
          ? armorType
          : armorType === "MEDIUM_ARMOR"
          ? "LIGHT_ARMOR"
          : armorType === "HEAVY_ARMOR"
          ? "MEDIUM_ARMOR"
          : armorType;
    }
  }
  return newType;
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
    const prf: number = perfect? 1 : 0
    const specialMat: string[] = ["MITHRAL", "DARKWOOD"];
    const normalMat: string[] = ["WOOD", "LEATHER", "METAL"]
    const bonus: number = material? specialMat.includes(material)? 2 + prf :
    !normalMat.includes(material) ? prf : 0 : 0
  return penality + bonus > 0 ? 0 : penality + bonus
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
