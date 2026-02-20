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
    strength: charAbilitys? charAbilitys.strength : 0 + prerAbilitys.strength,
    dexterity: charAbilitys? charAbilitys.dexterity : 0 + prerAbilitys.dexterity,
    constitution: charAbilitys? charAbilitys.constitution : 0 + prerAbilitys.constitution,
    intelligence: charAbilitys? charAbilitys.intelligence : 0 + prerAbilitys.intelligence,
    wisdom: charAbilitys? charAbilitys.wisdom : 0 + prerAbilitys.wisdom,
    charisma: charAbilitys? charAbilitys.charisma : 0 + prerAbilitys.charisma
  };
  return newAbility;
};
