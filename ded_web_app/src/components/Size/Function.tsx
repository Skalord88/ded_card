import { Weapon } from "../interfaces";
import { Size } from "./Interfaces";

export function reSizeWeapon(size: Size, weapon: Weapon): Weapon {
  console.log(weapon)
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
    switch (updatedWeapon.damage) {
      case "D3":
        updatedWeapon.damage = "D2";
        break;
      case 'D4': updatedWeapon.damage = 'D3'
        break;
      case 'D6': updatedWeapon.damage = 'D4'
        break;
      case 'D8': updatedWeapon.damage = 'D6'
        break;
      default:
        updatedWeapon.damage = updatedWeapon.damage;
        break;
    }
    updatedWeapon.size = "SMALL";
    updatedWeapon.weight = weapon.weight / 2;
  }
  if (size === "HUGE") {
    switch (updatedWeapon.damage) {
      case "D3":
        updatedWeapon.damage = "D4";
        break;
      case "D4":
        updatedWeapon.damage = "D6";
        break;
      case "D6":
        updatedWeapon.damage = "D8";
        break;
      case "D8":
        updatedWeapon.damage = "DD6";
        break;
      default:
        updatedWeapon.damage = updatedWeapon.damage;
        break;
    }
    updatedWeapon.size = "HUGE";
    updatedWeapon.weight = updatedWeapon.weight * 2
  }

  return updatedWeapon;
}
