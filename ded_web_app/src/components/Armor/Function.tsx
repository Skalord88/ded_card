import { FormattingText } from "../Formatting/Function";
import { SignAndCount } from "../functions";
import { CharacterPc } from "../interfaces";
import { ArmorList, ArmorModifiers } from "./interface/ArmorInterface";

export function CalculateArmorInChar(
  char: CharacterPc, armorModifiers: ArmorModifiers
): ArmorList {

  let armorList: ArmorList = [];
  armorList.push({
    sign: SignAndCount([armorModifiers.armor]).sign,
    bonus: armorModifiers.armor,
    text: "armor",
    item: char.inventory.armor.name
  });
  armorList.push({
    sign: SignAndCount([armorModifiers.shiled]).sign,
    bonus: armorModifiers.shiled,
    text: "shield",
    item: char.inventory.shield.name
  });
  armorList.push({
    sign: SignAndCount([armorModifiers.dexterity]).sign,
    bonus: armorModifiers.dexterity,
    text: "dexterity",
    item: ""
  });
  armorList.push({
    sign: SignAndCount([armorModifiers.size]).sign,
    bonus: armorModifiers.size,
    text: "size",
    item: FormattingText(char.race.size.size.toString())
  });
  armorList.push({
    sign: SignAndCount([armorModifiers.natural]).sign,
    bonus: armorModifiers.natural,
    text: "natural",
    item: ""
  });
  armorList.push({
    sign: SignAndCount([armorModifiers.dodge]).sign,
    bonus: armorModifiers.dodge,
    text: "dodge",
    item: ""
  });
  armorList.push({
    sign: SignAndCount([armorModifiers.deflection]).sign,
    bonus: armorModifiers.deflection,
    text: "deflection",
    item: ""
  });

  return armorList;
}

export function MaxdexterityCount (dexterity: number, max: number): number {
  return max < dexterity? max : dexterity;
}
