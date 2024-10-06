import { DiceText } from "../../Dice/Functions";
import { SignAndCount, WeaponLight } from "../../functions";
import { Position, Weapon } from "../../interfaces";
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
  specificFghFeats: number[];
  specificTarget: Modifiers[];
};

export const AttackOptions: React.FC<AttackOptionsProps> = ({
  type,
  weapon,
  dmg,
  strenghtAtt,
  dextrityAtt,
  position,
  increments,
  attackFn,
  specificFghFeats,
  specificTarget
}) => {
  const checkType = (typeToCheck: string): number => {
    if (typeToCheck === "distance") return dextrityAtt;
    if (typeToCheck === "distance two hands") return dextrityAtt;
    if (specificFghFeats.includes(120) && WeaponLight(weapon))
      return dextrityAtt;
    return strenghtAtt;
  };

  let bonus: number = checkType(type);

  const attacks: number[] = increments.map((inc) =>
    attackFn(weapon, bonus, position, inc, specificFghFeats.includes(116))
  );

  const checkTwoWeapons = (): number[] => {
    if (
      !position.pose &&
      type.includes("two hands") &&
      [116, 117, 118].every(val => specificFghFeats.includes(val))

    )
      return [attacks[0], attacks[1], attacks[2]];
    if (
      !position.pose &&
      type.includes("two hands") &&
      [116, 117].every(val => specificFghFeats.includes(val))
    )
      return [attacks[0], attacks[1]];
    if (!position.pose && type.includes("two hands")) return [attacks[0]];
    return attacks;
  };

  const attOneTwo: number[] = checkTwoWeapons();

  return (
    <>
      <D20PopupWeapon
        type={type}
        weapon={weapon}
        increments={increments}
        bab={attOneTwo}
        dmg={dmg}
        modifiers={specificTarget}
      />
      :
      {attOneTwo.map((att, index) => (
        <>
          {SignAndCount([att]).sign}
          {att}
          {attOneTwo.length - 1 > index ? <>{"/"}</> : <></>}
        </>
      ))}{" "}
      {weapon.damage}
      {SignAndCount([dmg]).sign}
      {dmg} {DiceText(weapon.critical)}
    </>
  );
};
