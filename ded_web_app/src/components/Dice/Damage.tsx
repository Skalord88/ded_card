import { Weapon } from "../interfaces";
import { CriticalDamage, CriticalHit, DamageDice, DiceText } from "./Functions";

export type DamageProps = {
  dice: number;
  weapon: Weapon
};

export const Damage: React.FC<DamageProps> = ({ dice, weapon }) => {
  return (
    <div>
      {dice === CriticalHit(weapon.critical) ? (
        <>{DiceText(weapon.damage)} {CriticalDamage(weapon)}</>
      ) : (
        <>
          {DiceText(weapon.damage)} {DamageDice(weapon.damage)}
        </>
      )}
    </div>
  );
};
