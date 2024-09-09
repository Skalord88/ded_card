import { SignAndCount } from "../functions";
import { CharacterPc } from "../interfaces";
import { ArmorList } from "./ArmorInterface";

export function CalculateArmorInChar(char: CharacterPc): ArmorList {
  let armorList: ArmorList = [];
  armorList.push({
    sign: SignAndCount([char.inventory.armor.armorClass]).sign,
    bonus: char.inventory.armor.armorClass,
    text: "armor"
  });
  armorList.push({
    sign: SignAndCount([char.inventory.shield.armorClass]).sign,
    bonus: char.inventory.shield.armorClass,
    text: "shield"
  });
  armorList.push({
    sign: SignAndCount([char.abilitys.dextrity]).sign,
    bonus: char.abilitys.dextrity,
    text: "dextrity"
  });

  return armorList;
}
