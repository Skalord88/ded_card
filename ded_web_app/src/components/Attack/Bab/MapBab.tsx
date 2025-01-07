import {
  AttackIIMelee,
  AttackIIRanged,
  AttackMelee,
  AttackRanged,
  weaponRanged,
  weaponThrown,
  weaponTwoHanded
} from "../../functions";
import { Position, Weapon } from "../../interfaces";
import { ChangeCritWithFeat } from "../../Items/Functions/function";
import { DiceModifiers, DicePopupProps } from "../../Popup/DicePopup/Interface";
import { Prerequisite } from "../../Prerequisite/interface/Prerequisite";
import { AttackRoll } from "../AttackRoll/interface";
import { AttackOptions } from "./AttackOptions";

export type MapBabProps = {
  bab: number;
  adjBab: number;
  strenght: number;
  strenghtAtt: number;
  dexterityAtt: number;
  weapon: Weapon;
  position: Position;
  modifiers?: DiceModifiers;
};

export const MapBab: React.FC<MapBabProps> = ({
  bab,
  adjBab,
  strenght,
  strenghtAtt,
  dexterityAtt,
  weapon,
  position,
  modifiers
}) => {
  const getIncrements = (bab: number) => {
    if (bab > 15) return [0, 5, 10, 15];
    if (bab > 10) return [0, 5, 10];
    if (bab > 5) return [0, 5];
    return [0];
  };
  const attacksIncrements = getIncrements(bab);

  const mono: number = weapon.enchantmentBonus? weapon.enchantmentBonus : 0;
  
  const strAttEnchanted: number = mono + strenghtAtt;
  const dexAttEnchanted: number = mono + dexterityAtt;

  const monoDmg: number = weapon.enchantmentBonus? weapon.enchantmentBonus : 0

  const twoHandDmg: number = position.twoHanded
    ? strenght + Math.floor(strenght / 2) + monoDmg
    : strenght + monoDmg;
  const dmgTwoHand: number =
    twoHandDmg < strenght + monoDmg ? strenght + monoDmg : twoHandDmg;

  // const critWeapon: Weapon = ChangeCritWithFeat(weapon,
  //   FindWeaponToModified(specific[2], weapon).find
  // )

  return (
    <div style={{ display: "grid" }}>
      <div style={{ gridColumn: 1, gridRow: 1 }}>
        {weaponRanged(weapon) ? null : (
          <AttackOptions
            type="melee"
            weapon={weapon}
            dmg={dmgTwoHand}
            strenghtAtt={strAttEnchanted}
            dexterityAtt={dexAttEnchanted}
            position={position}
            increments={attacksIncrements}
            attackFn={AttackMelee}
            modifiers={modifiers}
          />
        )}
      </div>
      <div style={{ gridColumn: 1, gridRow: 3 }}>
        {weaponRanged(weapon) || weaponThrown(weapon) ? (
          <AttackOptions
            type="distance"
            weapon={weapon}
            dmg={monoDmg}
            position={position}
            strenghtAtt={strAttEnchanted}
            dexterityAtt={dexAttEnchanted}
            increments={attacksIncrements}
            attackFn={AttackRanged}
            modifiers={modifiers}
          />
        ) : null}
      </div>
      <div style={{ gridColumn: 1, gridRow: 2 }}>
        {weaponRanged(weapon) || weaponTwoHanded(weapon) ? null : (
          <>
            {position.twoHanded ? null : (
              <AttackOptions
                type="melee two hands"
                weapon={weapon}
                dmg={Math.floor(strenght / 2) + monoDmg}
                position={position}
                strenghtAtt={strAttEnchanted}
                dexterityAtt={dexAttEnchanted}
                increments={attacksIncrements}
                attackFn={AttackIIMelee}
                modifiers={modifiers}
              />
            )}
          </>
        )}
      </div>
      <div style={{ gridColumn: 1, gridRow: 4 }}>
        {weaponTwoHanded(weapon) ? null : weaponRanged(weapon) ||
          weaponThrown(weapon) ? (
          <AttackOptions
            type="distance two hands"
            weapon={weapon}
            dmg={monoDmg}
            position={position}
            strenghtAtt={strAttEnchanted}
            dexterityAtt={dexAttEnchanted}
            increments={attacksIncrements}
            attackFn={AttackIIRanged}
            modifiers={modifiers}
          />
        ) : null}
      </div>
    </div>
  );
};
