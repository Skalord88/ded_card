import {
  AttackMelee,
  AttackRanged,
  AttackIIMelee,
  AttackIIRanged,
  WeaponRanged,
  SignAndCount,
  WeaponThrown
} from "../../functions";
import { CharBab, Position, Weapon } from "../../interfaces";
import { FindWeaponToModified, ModifiedWeaponBabBonus } from "../../Modifiers/Bab/Function";
import { D20PopupWeapon } from "../../Popup/DicePopup/D20PopupWeapon";

const AttackOptions: React.FC<{
  type: string;
  weapon: Weapon;
  strenghtAtt: number;
  dextrityAtt: number;
  position: Position;
  increments: number[];
  attackFn: Function;
}> = ({
  type,
  weapon,
  strenghtAtt,
  dextrityAtt,
  position,
  increments,
  attackFn
}) => {

  const checkType = (typeToCheck: string) => {
    if (typeToCheck === 'distance') return dextrityAtt;
    if (typeToCheck === 'distance two hands') return dextrityAtt;
    return strenghtAtt;
  }
  
  let bonus: number =  checkType(type);

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
        modifiers={[]}
      />
      :
      {attacks.map((att, index) => (
        <>
          {SignAndCount([att]).sign}
          {att}
          {attacks.length-1 > index ? <>{"/"}</> : <></>}
        </>
      ))}
    </>
  );
};

export const MapBab: React.FC<CharBab> = ({
  bab,
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

  const ench = weapon.enchantment? weapon.enchantment.enchantment === -1 ? 1 : weapon.enchantment.enchantment : 0

  const strenghtAttModified = strenghtAtt + FindWeaponToModified(specific, weapon) + ench
  const dextrityAttModified = dextrityAtt + FindWeaponToModified(specific, weapon) + ench

  const attacksIncrements = getIncrements(bab);

  return (
    <div className="rpgui-container-framed-grey" style={{ display: "grid" }}>
      <div style={{ gridColumn: 1, gridRow: 1 }}>
        {WeaponRanged(weapon) ? (
          <></>
        ) : (
          <>
          <AttackOptions
            type="melee"
            weapon={weapon}
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
            position={position}
            strenghtAtt={strenghtAttModified}
            dextrityAtt={dextrityAttModified}
            increments={attacksIncrements}
            attackFn={AttackRanged}
          />
        ) : (
          <></>
        )}
      </div>
      <div style={{ gridColumn: 1, gridRow: 2 }}>
        {WeaponRanged(weapon) ? (
          <></>
        ) : (
          <AttackOptions
            type="melee two hands"
            weapon={weapon}
            position={position}
            strenghtAtt={strenghtAttModified}
            dextrityAtt={dextrityAttModified}
            increments={attacksIncrements}
            attackFn={AttackIIMelee}
          />
        )}
      </div>
      <div style={{ gridColumn: 2, gridRow: 2 }}>
        {WeaponRanged(weapon) || WeaponThrown(weapon) ? (
          <AttackOptions
            type="distance two hands"
            weapon={weapon}
            position={position}
            strenghtAtt={strenghtAttModified}
            dextrityAtt={dextrityAttModified}
            increments={attacksIncrements}
            attackFn={AttackIIRanged}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
