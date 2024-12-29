import { DiceText } from "../../Dice/Functions";
import { signAndCount } from "../../functions";
import { Position, Weapon } from "../../interfaces";
import { D20PopupWeapon } from "../../Popup/DicePopup/D20PopupWeapon";
import { DiceModifiers } from "../../Popup/DicePopup/Interface";

export type AttackOptionsProps = {
  type: string;
  weapon: Weapon;
  dmg: number;
  strenghtAtt: number;
  dexterityAtt: number;
  position: Position;
  increments: number[];
  attackFn: Function;
  modifiers?: DiceModifiers
};

export const AttackOptions: React.FC<AttackOptionsProps> = ({
  type,
  weapon,
  dmg,
  strenghtAtt,
  dexterityAtt,
  position,
  increments,
  attackFn,
  modifiers
}) => {
  const checkType = (typeToCheck: string): number => {
    if (typeToCheck === "distance") return dexterityAtt;
    if (typeToCheck === "distance two hands") return dexterityAtt;
    // if (specificFghFeats.includes(120) && weaponLight(weapon))
    //   return dexterityAtt;
    return strenghtAtt;
  };

  let bonus: number = checkType(type);

  const attacks: number[] = increments.map((inc) =>
    attackFn(weapon, bonus, position, inc,
      //  specificFghFeats.includes(116)
      )
  );

  const checkTwoWeapons = (): number[] => {
    if (
      !position.pose &&
      type.includes("two hands")
    )
      return [attacks[0], attacks[1], attacks[2]];
    if (
      !position.pose &&
      type.includes("two hands")
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
        bab={[...attacks]}
        dmg={dmg}
      />
      :
      {attOneTwo.map((att, index) => (
        <span key={index}>
          {signAndCount([att]).sign}
          {att}
          {attOneTwo.length - 1 > index ? <>{"/"}</> : null}</span>
      ))}{" "}
      {weapon.damage}
      {signAndCount([dmg]).sign}
      {dmg} {DiceText(weapon.critical)}
    </>
  );
};
