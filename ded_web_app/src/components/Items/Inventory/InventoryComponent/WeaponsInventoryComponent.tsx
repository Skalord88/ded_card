import { DiceText } from "../../../Dice/Functions";
import { FormattingText } from "../../../Formatting/Function";
import {
  signAndCount,
  SignNumberEnchant,
  weaponTwoHanded
} from "../../../functions";
import { Enchantment, Weapon } from "../../../interfaces";
import { getWeaponEnchTargetMod } from "../../../Popup/DicePopup/D20PopupWeapon";
import { Popup } from "../../../Popup/Popup";

export type WeaponsInventoryComponentProps = {
  weapon1: Weapon;
  weapon2: Weapon;
  weapon3: Weapon;
  weapon4: Weapon;
  weapon5: Weapon;
};

export const getPerfectString = (list: Enchantment[]): string => {
  if(list.some(ench => "PERFECT".includes(ench.ability))) return "pft"
  return ""
}

export const WeaponsInventoryComponent: React.FC<
  WeaponsInventoryComponentProps
> = ({ weapon1, weapon2, weapon3, weapon4, weapon5 }) => {

  const enchList1: string = weapon1.enchantmentBonus ? ("+" + weapon1.enchantmentBonus) : weapon1.enchantment? getPerfectString(weapon1.enchantment) : ""
  const enchList2: string = weapon2.enchantmentBonus ? ("+" + weapon1.enchantmentBonus) : weapon1.enchantment? getPerfectString(weapon1.enchantment) : ""
  const enchList3: string = weapon3.enchantmentBonus ? ("+" + weapon1.enchantmentBonus) : weapon1.enchantment? getPerfectString(weapon1.enchantment) : ""
  const enchList4: string = weapon4.enchantmentBonus ? ("+" + weapon1.enchantmentBonus) : weapon1.enchantment? getPerfectString(weapon1.enchantment) : ""
  const enchList5: string = weapon5.enchantmentBonus ? ("+" + weapon1.enchantmentBonus) : weapon1.enchantment? getPerfectString(weapon1.enchantment) : ""

  return (
    <>
      <div style={{ gridColumn: "1 / span 2" }}>
        <p style={{ backgroundColor: "grey" }}>Weapons</p>
        <p>
          <Popup text={weapon1.name} popText={weapon1.description} />
        </p>
        <p>
          <Popup text={weapon2.name} popText={weapon2.description} />
        </p>
        <p>
          <Popup text={weapon3.name} popText={weapon3.description} />
        </p>
        <p>
          <Popup text={weapon4.name} popText={weapon4.description} />
        </p>
        <p>
          <Popup text={weapon5.name} popText={weapon5.description} />
        </p>
      </div>
      <div style={{ gridColumn: 3 }}>
        <p style={{ backgroundColor: "grey" }}>Enchantment</p>
        <p>{enchList1}</p>
        <p>{enchList2}</p>
        <p>{enchList3}</p>
        <p>{enchList4}</p>
        <p>{enchList5}</p>
        {/* <p>{SignNumberEnchant(enchList1)}</p>
        <p>{SignNumberEnchant(enchList2)}</p>
        <p>{SignNumberEnchant(enchList3)}</p>
        <p>{SignNumberEnchant(enchList4)}</p>
        <p>{SignNumberEnchant(enchList5)}</p> */}
      </div>
      <div style={{ gridColumn: 4 }}>
        <p style={{ backgroundColor: "grey" }}>Crit</p>
        <p>{DiceText(weapon1.critical)}</p>
        <p>{DiceText(weapon2.critical)}</p>
        <p>{DiceText(weapon3.critical)}</p>
        <p>{DiceText(weapon4.critical)}</p>
        <p>{DiceText(weapon5.critical)}</p>
      </div>

      <div style={{ gridColumn: 5 }}>
        <p style={{ backgroundColor: "grey" }}>Material</p>
        <p>{weapon1.material}</p>
        <p>{weapon2.material}</p>
        <p>{weapon3.material}</p>
        <p>{weapon4.material}</p>
        <p>{weapon5.material}</p>
      </div>
      <div style={{ gridColumn: 6 }}>
        <p style={{ backgroundColor: "grey" }}>Size</p>
        <p>{FormattingText(weapon1.size).charAt(0)}</p>
        <p>{FormattingText(weapon2.size).charAt(0)}</p>
        <p>{FormattingText(weapon3.size).charAt(0)}</p>
        <p>{FormattingText(weapon4.size).charAt(0)}</p>
        <p>{FormattingText(weapon5.size).charAt(0)}</p>
      </div>
      <div style={{ gridColumn: 7 }}>
        <p style={{ backgroundColor: "grey" }}>Hands</p>
        <p>{weaponTwoHanded(weapon1) ? 2 : 1}</p>
        <p>{weaponTwoHanded(weapon2) ? 2 : 1}</p>
        <p>{weaponTwoHanded(weapon3) ? 2 : 1}</p>
        <p>{weaponTwoHanded(weapon4) ? 2 : 1}</p>
        <p>{weaponTwoHanded(weapon5) ? 2 : 1}</p>
      </div>
      <div style={{ gridColumn: 9 }}>
        <p style={{ backgroundColor: "grey" }}>Weight</p>
        <p>{weapon1.weight}</p>
        <p>{weapon2.weight}</p>
        <p>{weapon3.weight}</p>
        <p>{weapon4.weight}</p>
        <p>{weapon5.weight}</p>
      </div>
    </>
  );
};
export const MiniWeaponsInventoryComponent: React.FC<
  WeaponsInventoryComponentProps
> = ({ weapon1, weapon2, weapon3, weapon4, weapon5 }) => {
  return (
    <>
      <p>
        <Popup text={weapon1.name} popText={weapon1.description} />
      </p>
      <p>{weapon1.damage}</p>
      <p>{weaponTwoHanded(weapon1) ? 2 : 1}</p>
      

      <p>
        <Popup text={weapon2.name} popText={weapon2.description} />
      </p>
      <p>{weapon2.damage}</p>
      <p>{weaponTwoHanded(weapon2) ? 2 : 1}</p>
      

      <p>
        <Popup text={weapon3.name} popText={weapon3.description} />
      </p>
      <p>{weapon3.damage}</p>
      <p>{weaponTwoHanded(weapon3) ? 2 : 1}</p>
      

      <p>
        <Popup text={weapon4.name} popText={weapon4.description} />
      </p>
      <p>{weapon4.damage}</p>
      <p>{weaponTwoHanded(weapon4) ? 2 : 1}</p>
      

      <p>
        <Popup text={weapon5.name} popText={weapon5.description} />
      </p>
      <p>{weapon5.damage}</p>
      <p>{weaponTwoHanded(weapon5) ? 2 : 1}</p>

    </>
  );
};
