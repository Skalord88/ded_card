import { Attacks, SpecialAttacks, Weapon } from "../interfaces";
import { CharToModify } from "../Prerequisite/functions/modifyCharacter";
import { noneWeapon } from "../variables";

export type SpecialAttacksList = {
  title: string;
  value: number;
};

export const sepcialAttacksToList = (prer: SpecialAttacks[]): SpecialAttacksList[] => {

  const specialAttacksList: SpecialAttacksList[] = [
        { title: "bullRush", value: prer.reduce((tot, att) => tot + att.bullRush,0) },
        { title: "charge", value: prer.reduce((tot, att) => tot + att.charge,0) },
        { title: "disarm", value: prer.reduce((tot, att) => tot + att.disarm,0) },
        { title: "grapple", value: prer.reduce((tot, att) => tot + att.grapple,0) },
        { title: "sunder", value: prer.reduce((tot, att) => tot + att.sunder,0) },
        { title: "vsBullRush", value: prer.reduce((tot, att) => tot + att.vsBullRush,0) },
        { title: "vsCharge", value: prer.reduce((tot, att) => tot + att.vsCharge,0) },
        { title: "vsDisarm", value: prer.reduce((tot, att) => tot + att.vsDisarm,0) },
        { title: "vsGrapple", value: prer.reduce((tot, att) => tot + att.vsGrapple,0) },
        { title: "vsOverrun", value: prer.reduce((tot, att) => tot + att.vsOverrun,0) },
        { title: "vsSunder", value: prer.reduce((tot, att) => tot + att.vsSunder,0) }
    ];

    return specialAttacksList.filter(att => att.title === "grapple" || att.value !== 0);
}

export const modifyAttacks = (char: CharToModify): Attacks => {
  const attacks: Attacks = char.attacks;
  const weaponList: Weapon[] = [
    char.inventory.weaponOne,
    char.inventory.weaponTwo,
    char.inventory.weaponThree,
    char.inventory.weaponFour,
    char.inventory.weaponFive
  ];
  return {
    ...attacks,
    firstAttackSetOne: weaponList.find(weapon => weapon !== null && attacks.firstAttackSetOne ? weapon.id === attacks.firstAttackSetOne.id : false) || noneWeapon,
    secondAttackSetOne: weaponList.find(weapon => weapon && attacks.secondAttackSetOne ? weapon.id === attacks.secondAttackSetOne.id : false) || noneWeapon,
    additionalAttackSetOne: weaponList.find(weapon => weapon && attacks.additionalAttackSetOne ? weapon.id === attacks.additionalAttackSetOne.id : false) || noneWeapon,
    
    firstAttackSetTwo: weaponList.find(weapon => weapon && attacks.firstAttackSetTwo ? weapon.id === attacks.firstAttackSetTwo.id : false) || noneWeapon,
    secondAttackSetTwo: weaponList.find(weapon => weapon && attacks.secondAttackSetTwo ? weapon.id === attacks.secondAttackSetTwo.id : false) || noneWeapon,
    additionalAttackSetTwo: weaponList.find(weapon => weapon && attacks.additionalAttackSetTwo ? weapon.id === attacks.additionalAttackSetTwo.id : false) || noneWeapon
  };
};