import { Abilitys } from "../../../Abilitys/Interface";

export const changeAbilitysFromPrerequisite = (
  charAbilitys: Abilitys,
  prerAbilitysList: Abilitys[]
): Abilitys => {
  if (prerAbilitysList.length > 0) {
    let abilitys: Abilitys = charAbilitys;

    prerAbilitysList.forEach((prer) => {
      charAbilitys = modifyAbilitys(abilitys, prer);
    });

    return charAbilitys;
  } else {
    return charAbilitys;
  }
};

export const modifyAbilitys = (
  charAbilitys: Abilitys,
  prerAbilitys: Abilitys
): Abilitys => {
  const newAbility: Abilitys = {
    ...charAbilitys,
    strength: charAbilitys.strength + prerAbilitys.strength,
    dexterity: charAbilitys.dexterity + prerAbilitys.dexterity,
    constitution: charAbilitys.constitution + prerAbilitys.constitution,
    intelligence: charAbilitys.intelligence + prerAbilitys.intelligence,
    wisdom: charAbilitys.wisdom + prerAbilitys.wisdom,
    charisma: charAbilitys.charisma + prerAbilitys.charisma
  };
  return newAbility;
};
