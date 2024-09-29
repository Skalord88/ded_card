import randomInteger from "random-int";
import { Weapon } from "../interfaces";

export function ThrowDice2(): number {
  return randomInteger(1, 2);
}
export function ThrowDice3(): number {
  return randomInteger(1, 3);
}
export function ThrowDice4(): number {
  return randomInteger(1, 4);
}
export function ThrowDice6(): number {
  return randomInteger(1, 6);
}
export function ThrowDice8(): number {
  return randomInteger(1, 8);
}
export function ThrowDice10(): number {
  return randomInteger(1, 10);
}
export function ThrowDice12(): number {
  return randomInteger(1, 12);
}
export function ThrowDice20(): number {
  return randomInteger(1, 20);
}
export function ThrowDice100(): number {
  return randomInteger(1, 100);
}
export function DiceText(dice: string): string {
  switch (dice) {
    case "D2":
      return "d2";
    case "D3":
      return "d3";
    case "D4":
      return "d4";
    case "DD4":
      return "2d4";
    case "D6":
      return "d6";
    case "DD6":
      return "2d6";
    case "D8":
      return "d8";
    case "D10":
      return "d10";
    case "D12":
      return "d12";
    case "X2":
      return "x2";
    case "X2_1920":
      return "19-20/×2";
    case "X2_1820":
      return "18-20/x2";
    case "X3":
      return "x3";
    case "X3_1920":
      return "19-20/x3";
    case "X4":
      return "x4";
    case "X4_1920":
      return "19-20/x4";
    default:
      return "d0";
  }
}
// D1("D1"),
// D10("D10"),
// D12("D12"),
// D2("D2"),
// D3("D3"),
// D4("D4"),
// DD4("DD4"),
// D6("D6"),
// DD6("DD6"),
// D6_D6("D6_D6"),
// D8("D8"),
// D8_D6("D8_D6"),
// D8_D8("D8_D8"),
// NA("NA"),
// D20("D20"),
// D100("D100"),
// X2("X2"),
// X3("X3"),
// X4("X4"),
// X2_1920("X2_1920"),
// X2_1820("X2_1820"),
// X3X4("X3X4");

export function DamageDice(damage: string, dmg: number): number[] {
  switch (damage) {
    case "D2":
      return [ThrowDice2() + dmg];
    case "D3":
      return [ThrowDice3() + dmg];
    case "D4":
      return [ThrowDice4() + dmg];
    case "DD4":
      return [ThrowDice4() + ThrowDice4() + dmg];
    case "D6":
      return [ThrowDice6() + dmg];
    case "DD6":
      return [ThrowDice6() + ThrowDice6() + dmg];
    case "D8":
      return [ThrowDice8() + dmg];
    case "D10":
      return [ThrowDice10() + dmg];
    case "D12":
      return [ThrowDice12() + dmg];
    default:
      return [0];
  }
}
export function TotDamageDice(damage: number[]): number {
  return damage.reduce(
    (total, n) => total + n, 0
  )
}
export function CriticalHit(critic: string): number[] {
  switch (critic) {
    case "X2_1920":
      return [19, 20];
    case "X2_1820":
      return [18, 19, 20];
    case "X3_1920":
      return [19, 20];
    case "X4_1920":
      return [19, 20];
    default:
      return [20];
  }
}
export function CriticalDamage(weapon: Weapon, dmg:number): number[] {
  switch (weapon.critical) {
    case "X2":
      return [
        TotDamageDice(DamageDice(weapon.damage, 0))
        + TotDamageDice(DamageDice(weapon.damage, dmg))
      ];
    case "X3":
      return [
        TotDamageDice(DamageDice(weapon.damage, 0))
        + TotDamageDice(DamageDice(weapon.damage, 0)) 
        + TotDamageDice(DamageDice(weapon.damage, dmg))
      ];
    case "X4":
      return [
        TotDamageDice(DamageDice(weapon.damage, 0))
        + TotDamageDice(DamageDice(weapon.damage, 0)) 
        + TotDamageDice(DamageDice(weapon.damage, 0))
        + TotDamageDice(DamageDice(weapon.damage, dmg))
      ];
    case "X2_1920":
      return [
        TotDamageDice(DamageDice(weapon.damage, 0))
        + TotDamageDice(DamageDice(weapon.damage, dmg))
      ];
    case "X2_1820":
      return [
        TotDamageDice(DamageDice(weapon.damage, 0))
        + TotDamageDice(DamageDice(weapon.damage, dmg))
      ];
    default:
      return [0];
  }
}

