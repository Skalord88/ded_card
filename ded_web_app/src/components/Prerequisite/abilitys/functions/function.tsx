import { Abilitys } from "../../../Abilitys/Interface";

export const changeAbilitysFromPrerequisite = (
  charAbilitys: Abilitys,
  prerAbilitysList: Abilitys[]
): Abilitys => {
  const str: number = prerAbilitysList.reduce(
    (tot, ab) => tot + ab.strength,
    0
  );
  const dex: number = prerAbilitysList.reduce(
    (tot, ab) => tot + ab.dexterity,
    0
  );
  const cos: number = prerAbilitysList.reduce(
    (tot, ab) => tot + ab.constitution,
    0
  );
  const int: number = prerAbilitysList.reduce(
    (tot, ab) => tot + ab.intelligence,
    0
  );
  const wis: number = prerAbilitysList.reduce(
    (tot, ab) => tot + ab.wisdom,
    0
  );
  const cha: number = prerAbilitysList.reduce(
    (tot, ab) => tot + ab.charisma,
    0
  );

  return modifyAbilitys(charAbilitys, {
    strength: str,
    dexterity: dex,
    constitution: cos,
    intelligence: int,
    wisdom: wis,
    charisma: cha
  });
};

export const modifyAbilitys = (
  charAbilitys: Abilitys,
  prerAbilitys: Abilitys
): Abilitys => {
  const newAbility: Abilitys = {
    strength: charAbilitys.strength + prerAbilitys.strength,
    dexterity: charAbilitys.dexterity + prerAbilitys.dexterity,
    constitution: charAbilitys.constitution + prerAbilitys.constitution,
    intelligence: charAbilitys.intelligence + prerAbilitys.intelligence,
    wisdom: charAbilitys.wisdom + prerAbilitys.wisdom,
    charisma: charAbilitys.charisma + prerAbilitys.charisma
  };
  return newAbility;
};
