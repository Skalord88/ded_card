import { FormattingText } from "../Formatting/Function";
import { BonusAbilities, signAndCount } from "../functions";
import { CharToModify } from "../Prerequisite/functions/modifyCharacter";
import { ArmorList } from "./interface/ArmorInterface";

export function calculateArmorInChar(char: CharToModify): ArmorList {
  
  const enchArmor: number = char.inventory.armor.enchantmentBonus ? char.inventory.armor.enchantmentBonus : 0;
  const enchShield: number = char.inventory.shield.enchantmentBonus ? char.inventory.shield.enchantmentBonus : 0;
  const size: number = char.armor.mono.reduce((tot, armor) => armor ? (armor.sizeBonus ?? 0) + tot : tot, 0);
  const natural: number = char.armor.mono.reduce((tot, armor) => armor ? (armor.naturalArmor ?? 0) + tot : tot, 0);
  const dodge: number = char.armor.mono.reduce((tot, armor) => armor ? (armor.dodgeBonus ?? 0) + tot : tot, 0);
  const deflection: number = char.armor.mono.reduce((tot, armor) => armor ? (armor.deflectionBonuses ?? 0) + tot : tot, 0);

  let armorList: ArmorList = [];
  if (char.inventory.armor.modifiers?.armorClass && char.inventory.armor.modifiers?.armorClass.armorBonus)
  armorList.push({
    signNum: signAndCount([
    char.inventory.armor.modifiers?.armorClass.armorBonus,
    enchArmor
    ]),
    text: "armor",
    item: ""
  });
  if (char.inventory.shield.modifiers?.armorClass && char.inventory.shield.modifiers?.armorClass.shieldBonus)
  armorList.push({
    signNum: signAndCount([
    char.inventory.shield.modifiers?.armorClass.shieldBonus,
    enchShield
    ]),
    text: "shield",
    item: ""
  });
  armorList.push({
  signNum: signAndCount([
    maxDexterityCount(
    BonusAbilities(char.abilitys, "DEX"), 
    char.inventory.armor.maxDex)]),
  text: "dexterity",
  item: "max bonus " + char.inventory.armor.maxDex.toString()
  });
  armorList.push({
    signNum: signAndCount([size]),
    text: "size",
    item: FormattingText(char.size.size)
  });
  armorList.push({
  signNum: signAndCount([natural]),
  text: "natural",
  item: ""
  });
  armorList.push({
  signNum: signAndCount([dodge]),
  text: "dodge",
  item: ""
  });
  armorList.push({
  signNum: signAndCount([deflection]),
  text: "deflection",
  item: ""
  });

  const total = {
  signNum: signAndCount([
    10,
    armorList.reduce((tot, armor) => tot + armor.signNum.number, 0)])
  ,
  text: "total",
  item: ""
  };

  return [total, ...armorList];
}

export function maxDexterityCount(dexterity: number, max: number): number {
  return max < dexterity ? max : dexterity;
}
