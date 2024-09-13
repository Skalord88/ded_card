import { Weapon } from "../interfaces";
import { CriticalDamage, CriticalHit, DamageDice, DiceText } from "./Functions";

export type WeaponDamageDiceProps = {
  dices: number[];
  weapon: Weapon;
};

export const WeaponDamageDice: React.FC<WeaponDamageDiceProps> = ({
  dices,
  weapon
}) => {
  
  return (
    <>
      {dices.map((dice) => {
        return dice === CriticalHit(weapon.critical) ? (
          <p style={{color: 'red'}}>
            {DiceText(weapon.damage)} {CriticalDamage(weapon)}
          </p>
        ) : (
          <p>
            {DiceText(weapon.damage)} {DamageDice(weapon.damage)}
          </p>
        );
      })}
    </>
  );
};
