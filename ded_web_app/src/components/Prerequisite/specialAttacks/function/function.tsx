import { SpecialAttacks } from "../../../interfaces";

export const changeSpecialAttacksFromPrerequisite = (
    charSpecialAttacks: SpecialAttacks,
    prerSpecialAttacksList: SpecialAttacks[]
): SpecialAttacks => {
  if (prerSpecialAttacksList.length > 0) {
    let specialAttacks: SpecialAttacks = charSpecialAttacks;

    prerSpecialAttacksList.forEach((prer) => {
        charSpecialAttacks = modifySpecialAttacks(specialAttacks, prer);
    });

    return specialAttacks;
  } else {
    return charSpecialAttacks;
  }
};

export const modifySpecialAttacks = (
  charSpecialAttacks: SpecialAttacks,
  prerSpecialAttacks: SpecialAttacks
): SpecialAttacks => {
  const newSpecialAttacks: SpecialAttacks = {
    ...charSpecialAttacks,
    bullRush: charSpecialAttacks.bullRush + prerSpecialAttacks.bullRush,
    charge: charSpecialAttacks.charge + prerSpecialAttacks.charge,
    disarm: charSpecialAttacks.disarm + prerSpecialAttacks.disarm,
    grapple: charSpecialAttacks.grapple + prerSpecialAttacks.grapple,
    overrun: charSpecialAttacks.overrun + prerSpecialAttacks.overrun,
    sunder: charSpecialAttacks.sunder + prerSpecialAttacks.sunder
  };
  return newSpecialAttacks;
};