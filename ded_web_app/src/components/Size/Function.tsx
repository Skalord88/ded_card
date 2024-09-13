import { Weapon } from "../interfaces";
import { Size } from "./Interfaces";

export function reSizeWeapon(size: Size, weapon: Weapon): Weapon {
  let updatedWeapon = { ...weapon };

  if (updatedWeapon.type !== null) {
    updatedWeapon = updatedWeapon.type.includes("UNARMED")
      ? (updatedWeapon = damageReSize(size.size.toString(), updatedWeapon))
      : updatedWeapon;
    if (size.id === 4 && updatedWeapon.size === "MEDIUM") {
      updatedWeapon = reSizeBySizeWeapon("MEDIUM", weapon);
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
  if (size === "SMALL") {
    switch (weapon.damage) {
      case "D3":
        weapon.damage = "D2";
        break;
      case 'D4': weapon.damage = 'D3'
        break;
      case 'D6': weapon.damage = 'D4'
        break;
      case 'D8': weapon.damage = 'D6'
        break;
      default:
        weapon.damage = weapon.damage;
        break;
    }
    weapon.size = "SMALL";
    weapon.weight = weapon.weight / 2;
  }
  if (size === "HUGE") {
    switch (weapon.damage) {
      case "D3":
        weapon.damage = "D4";
        break;
      case "D4":
        weapon.damage = "D6";
        break;
      case "D6":
        weapon.damage = "D8";
        break;
      case "D8":
        weapon.damage = "DD6";
        break;
      default:
        weapon.damage = weapon.damage;
        break;
    }
    weapon.size = "HUGE";
    weapon.weight = weapon.weight * 2
  }

  return weapon;
}
