import {
  AttackMelee,
  AttackRanged,
  AttackIIMelee,
  AttackIIRanged,
  WeaponRanged,
  WeaponThrown,
  WeaponTwoHanded} from "../../functions";
import { Position, Weapon } from "../../interfaces";
import { ChangeCritWithFeat } from "../../Items/Functions/Functions";
import { FindWeaponToModified } from "../../Modifiers/Bab/Function";
import { FindInOneLengthModifier } from "../../Modifiers/Function";
import { Modifiers } from "../../Modifiers/ModifierInterface";
import { AttackOptions } from "./AttackOptions";

export type MapBabProps = {
  bab: number;
  strenght: number;
  strenghtAtt: number;
  dextrityAtt: number;
  weapon: Weapon;
  position: Position;
  specific: Modifiers[][];
  specificFghFeats: number[];
};

export const MapBab: React.FC<MapBabProps> = ({
  bab,
  strenght,
  strenghtAtt,
  dextrityAtt,
  weapon,
  position,
  specific,
  specificFghFeats
}) => {
  const getIncrements = (bab: number) => {
    if (bab > 15) return [0, 5, 10, 15];
    if (bab > 10) return [0, 5, 10];
    if (bab > 5) return [0, 5];
    return [0];
  };
  const attacksIncrements = getIncrements(bab);

  const getEnchant = (enchant: number) => {
    if (enchant === null) return 0;
    if (enchant === -2) return 0;
    if (enchant === -1) return 1;
    if (enchant === 0) return 0;
    if (enchant < 0) return enchant;
    return 0;
  };

  const ench = getEnchant(weapon.enchantment.enchantment);

  const strenghtAttModified: number =
    strenghtAtt + FindWeaponToModified(specific[0], weapon).bonus + ench;

  const dextrityAttModified: number =
    dextrityAtt + FindWeaponToModified(specific[0], weapon).bonus + ench;

  const compo = weapon.modifiers? FindInOneLengthModifier(weapon.modifiers, 'COMPOSITE') : 0;

  const enchDmg: number =
    weapon.enchantment.enchantment < 0
      ? 0 + FindWeaponToModified(specific[1], weapon).bonus + compo
      : weapon.enchantment.enchantment +
        FindWeaponToModified(specific[1], weapon).bonus + compo;

  const twoHandDmg: number = position.twoHanded
    ? strenght + Math.floor(strenght / 2) + enchDmg
    : strenght + enchDmg;
  const dmgTwoHand: number =
    twoHandDmg < strenght + enchDmg ? strenght + enchDmg : twoHandDmg;

  const critWeapon: Weapon = ChangeCritWithFeat(weapon,
    FindWeaponToModified(specific[2], weapon).find
  )

  return (
    <div style={{ display: "grid" }}>
      <div style={{ gridColumn: 1, gridRow: 1 }}>
        {WeaponRanged(weapon) ? null : (
            <AttackOptions
              type="melee"
              weapon={critWeapon}
              dmg={dmgTwoHand}
              strenghtAtt={strenghtAttModified}
              dextrityAtt={dextrityAttModified}
              position={position}
              increments={attacksIncrements}
              attackFn={AttackMelee}
              specificFghFeats={specificFghFeats}
              specificTarget={specific[3]}
            />
        )}
      </div>
      <div style={{ gridColumn: 1, gridRow: 3 }}>
        {WeaponRanged(weapon) || WeaponThrown(weapon) ? (
          <AttackOptions
            type="distance"
            weapon={critWeapon}
            dmg={enchDmg}
            position={position}
            strenghtAtt={strenghtAttModified}
            dextrityAtt={dextrityAttModified}
            increments={attacksIncrements}
            attackFn={AttackRanged}
            specificFghFeats={specificFghFeats}
            specificTarget={specific[3]}
          />
        ) : null}
      </div>
      <div style={{ gridColumn: 1, gridRow: 2 }}>
        {WeaponRanged(weapon) || WeaponTwoHanded(weapon) ? null : (
          <>
            {position.twoHanded ? null : (
              <AttackOptions
                type="melee two hands"
                weapon={critWeapon}
                dmg={Math.floor(strenght / 2) + enchDmg}
                position={position}
                strenghtAtt={strenghtAttModified}
                dextrityAtt={dextrityAttModified}
                increments={attacksIncrements}
                attackFn={AttackIIMelee}
                specificFghFeats={specificFghFeats}
                specificTarget={specific[3]}
              />
            )}
          </>
        )}
      </div>
      <div style={{ gridColumn: 1, gridRow: 4 }}>
        {WeaponTwoHanded(weapon) ? null : WeaponRanged(weapon) ||
          WeaponThrown(weapon) ? (
          <AttackOptions
            type="distance two hands"
            weapon={critWeapon}
            dmg={enchDmg}
            position={position}
            strenghtAtt={strenghtAttModified}
            dextrityAtt={dextrityAttModified}
            increments={attacksIncrements}
            attackFn={AttackIIRanged}
            specificFghFeats={specificFghFeats}
            specificTarget={specific[3]}
          />
        ) : null}
      </div>
    </div>
  );
};
