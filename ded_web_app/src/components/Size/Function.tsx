import { Weapon } from "../interfaces";
import { Size } from "./interfaces";

export const reWeightItem = (sizeId: number, weight: number): number => {
  if(sizeId === 4) {
    return weight / 2
  }
  if(sizeId === 6) {
    return weight * 2
  }
  return weight;
}

export function reSizeWeapon(size: Size, weapon: Weapon): Weapon {
  let updatedWeapon: Weapon = { ...weapon };

  if (updatedWeapon.type !== null) {
    if (updatedWeapon.type.includes("UNARMED")) {
      updatedWeapon = damageReSize(size.size, updatedWeapon);
    }
    if (size.id === 4 && updatedWeapon.size === "MEDIUM") {
      updatedWeapon = reSizeBySizeWeapon("MEDIUM", updatedWeapon);
    }
  }
  return updatedWeapon;
}


export function reSizeBySizeWeapon(size: string, weapon: Weapon): Weapon {
  let updatedWeapon = { ...weapon };
  if (size === "MEDIUM") {
    updatedWeapon.type = updatedWeapon.type.filter(
      (t) => t !== "LIGHT" && t !== "ONE_HANDED"
    );
    updatedWeapon.type.push("TWO_HANDED");
  }
  return updatedWeapon;
}

export function damageReSize(size: string, weapon: Weapon): Weapon {
  let updatedWeapon = { ...weapon };
  if (size === "SMALL") {
    const damageUpgradeMap: Record<string, string> = {
      "D3": "D2",
      "D4": "D3",
      "D6": "D4",
      "D8": "D6",
      "D10": "D8",
      "DDD6": "DD6"
    };

    if (updatedWeapon.damage in damageUpgradeMap) {
      updatedWeapon.damage = damageUpgradeMap[updatedWeapon.damage];
    }
    updatedWeapon.size = "SMALL";
    updatedWeapon.weight = weapon.weight / 2;
  }
  if (size === "LARGE") {
    const damageUpgradeMap: Record<string, string> = {
      "D3": "D4",
      "D4": "D6",
      "D6": "D8",
      "D8": "DD6",
      "DD6": "DDD6"
    };
  
    if (updatedWeapon.damage in damageUpgradeMap) {
      updatedWeapon.damage = damageUpgradeMap[updatedWeapon.damage];
    }
    updatedWeapon.size = "LARGE";
    updatedWeapon.weight = updatedWeapon.weight * 2
  }

  return updatedWeapon;
}
