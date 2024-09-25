import {
  AttackMelee,
  AttackRanged,
  AttackIIMelee,
  AttackIIRanged,
  WeaponRanged,
  SignAndCount,
  WeaponThrown,
  WeaponTwoHanded
} from "../../functions";
import { Position, Weapon } from "../../interfaces";
import { FindWeaponToModified } from "../../Modifiers/Bab/Function";
import { Modifiers } from "../../Modifiers/ModifierInterface";
import { D20PopupWeapon } from "../../Popup/DicePopup/D20PopupWeapon";

export type AttackOptionsProps = {
  type: string;
  weapon: Weapon;
  dmg: number;
  strenghtAtt: number;
  dextrityAtt: number;
  position: Position;
  increments: number[];
  attackFn: Function;
};

export const AttackOptions: React.FC<AttackOptionsProps> = ({
  type,
  weapon,
  dmg,
  strenghtAtt,
  dextrityAtt,
  position,
  increments,
  attackFn
}) => {
  // const checkDamageBonus = (strenght: number, position: Position): number => {
  //   if(position.)
  // }

  const checkType = (typeToCheck: string): number => {
    if (typeToCheck === "distance") return dextrityAtt;
    if (typeToCheck === "distance two hands") return dextrityAtt;
    return strenghtAtt;
  };

  let bonus: number = checkType(type);

  const attacks: number[] = increments.map((inc) =>
    attackFn(weapon, bonus, position, inc)
  );

  return (
    <>
      <D20PopupWeapon
        type={type}
        weapon={weapon}
        increments={increments}
        bab={attacks}
        dmg={dmg}
        modifiers={[]}
      />
      :
      {attacks.map((att, index) => (
        <>
          {SignAndCount([att]).sign}
          {att}
          {attacks.length - 1 > index ? <>{"/"}</> : <></>}
        </>
      ))}{" "}
      {weapon.damage}
      {SignAndCount([dmg]).sign}
      {dmg}
    </>
  );
};

export type MapBabProps = {
  bab: number;
  strenght: number;
  strenghtAtt: number;
  dextrityAtt: number;
  weapon: Weapon;
  position: Position;
  specific: Modifiers[];
};

export const MapBab: React.FC<MapBabProps> = ({
  bab,
  strenght,
  strenghtAtt,
  dextrityAtt,
  weapon,
  position,
  specific
}) => {
  const getIncrements = (bab: number) => {
    if (bab > 15) return [0, 5, 10, 15];
    if (bab > 10) return [0, 5, 10];
    if (bab > 5) return [0, 5];
    return [0];
  };
  const attacksIncrements = getIncrements(bab);

  const ench = weapon.enchantment
    ? weapon.enchantment.enchantment === -1
      ? 1
      : weapon.enchantment.enchantment
    : 0;

  const strenghtAttModified =
    strenghtAtt + FindWeaponToModified(specific, weapon) + ench;
  const dextrityAttModified =
    dextrityAtt + FindWeaponToModified(specific, weapon) + ench;

  const enchDmg =
    weapon.enchantment.enchantment < 0 ? 0 : weapon.enchantment.enchantment;

  const twoHandDmg: number = position.twoHanded
    ? strenght + Math.floor(strenght / 2) + enchDmg
    : strenght + enchDmg;
  const dmgTwoHand: number =
    twoHandDmg < strenght + enchDmg ? strenght + enchDmg : twoHandDmg;

  return (
    <div style={{ display: "grid" }}>
      <div style={{ gridColumn: 1, gridRow: 1 }}>
        {WeaponRanged(weapon) ? null : (
          <>
            <AttackOptions
              type="melee"
              weapon={weapon}
              dmg={dmgTwoHand}
              strenghtAtt={strenghtAttModified}
              dextrityAtt={dextrityAttModified}
              position={position}
              increments={attacksIncrements}
              attackFn={AttackMelee}
            />
          </>
        )}
      </div>
      <div style={{ gridColumn: 2, gridRow: 1 }}>
        {WeaponRanged(weapon) || WeaponThrown(weapon) ? (
          <AttackOptions
            type="distance"
            weapon={weapon}
            dmg={enchDmg}
            position={position}
            strenghtAtt={strenghtAttModified}
            dextrityAtt={dextrityAttModified}
            increments={attacksIncrements}
            attackFn={AttackRanged}
          />
        ) : null}
      </div>
      <div style={{ gridColumn: 1, gridRow: 2 }}>
        {WeaponRanged(weapon) || WeaponTwoHanded(weapon) ? null : (
          <>
            {position.twoHanded ? null : (
              <AttackOptions
                type="melee two hands"
                weapon={weapon}
                dmg={Math.floor(strenght / 2) + enchDmg}
                position={position}
                strenghtAtt={strenghtAttModified}
                dextrityAtt={dextrityAttModified}
                increments={attacksIncrements}
                attackFn={AttackIIMelee}
              />
            )}
          </>
        )}
      </div>
      <div style={{ gridColumn: 2, gridRow: 2 }}>
        {WeaponTwoHanded(weapon) ? null : WeaponRanged(weapon) ||
          WeaponThrown(weapon) ? (
          <AttackOptions
            type="distance two hands"
            weapon={weapon}
            dmg={enchDmg}
            position={position}
            strenghtAtt={strenghtAttModified}
            dextrityAtt={dextrityAttModified}
            increments={attacksIncrements}
            attackFn={AttackIIRanged}
          />
        ) : null}
      </div>
    </div>
  );
};
