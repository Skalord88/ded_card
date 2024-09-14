import { SignAndCount } from "../functions";
import { Weapon } from "../interfaces";
import { CriticalDamage, CriticalHit, DamageDice, DiceText } from "./Functions";

export type WeaponDamageDiceProps = {
  dices: number[];
  weapon: Weapon;
  dmg: number
};

export const WeaponDamageDice: React.FC<WeaponDamageDiceProps> = ({
  dices,
  weapon,
  dmg
}) => {

  const totalDamage: {
    text: string,
    dice: number, 
    crit: number, 
    damage: number}[] = dices.map(d => {
    let critic = CriticalDamage(weapon, dmg)[0];
    if(critic < 1) critic = 1;
    let danni = DamageDice(weapon.damage, dmg)[0]
    if(danni < 1) danni = 1
    return {
      text: DiceText(weapon.damage) + SignAndCount([dmg]).sign + dmg, 
      dice: d, 
      crit: critic, 
      damage: danni
    }
  })
  
  
  return (
    <>
      {totalDamage.map((d) => {
        return d.dice === CriticalHit(weapon.critical) ? (
          <p style={{color: 'red'}}>
            {d.text} {d.crit}
          </p>
        ) : (
          <p>
            {d.text} {d.damage}
          </p>
        );
      })}
    </>
  );
};
