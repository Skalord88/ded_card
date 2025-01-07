import { useState } from "react";
import { ThrowDice20 } from "../../Dice/Functions";
import { DicePopupWeaponProps } from "./Interface";
import { WeaponThrowDice } from "../../Dice/WeaponThrowDice";
import { WeaponDamageDice } from "../../Dice/WeaponDamageDice";
import { AttackRoll } from "../../Attack/AttackRoll/interface";
import { Weapon } from "../../interfaces";

export const getWeaponEnchTargetMod = (w: Weapon): AttackRoll[] => {
  return w.enchantment?.flatMap((ench) =>
    ench.modifiers?.attackRoll?.target !== null ? w.modifiers?.attackRoll : []
  ) as AttackRoll[];
};
export const getWeaponTargetMod = (w: Weapon): AttackRoll => {
  return w.modifiers?.attackRoll?.target !== null
    ? (w.modifiers?.attackRoll as AttackRoll)
    : ({} as AttackRoll);
};

export const D20PopupWeapon: React.FC<DicePopupWeaponProps> = ({
  type,
  bab,
  dmg,
  weapon,
  bucklerMls,
  targetMod
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [dice, setDice] = useState(0);

  const weaponEnchTargetMod: AttackRoll[] = getWeaponEnchTargetMod(weapon);
  const weaponTargetMod: AttackRoll = getWeaponTargetMod(weapon);
  const newTargetMod: AttackRoll[] = targetMod?.concat(weaponEnchTargetMod, [
    weaponTargetMod
  ]) as AttackRoll[];

  const dices: number[] = bab.map((inc) => ThrowDice20());

  const togglePopup = (show: boolean) => {
    if (show) {
      const lancio = ThrowDice20();
      setDice(lancio);
    }
    setShowPopup(show);
  };
  return (
    <>
      <div
        className="popup"
        onClick={() => togglePopup(true)}
        onMouseLeave={() => togglePopup(false)}
        style={{ color: "yellow" }}
      >
        {type}
        <span
          style={{ width: 400, display: "inline-block" }}
          className={`popuptext rpgui-container-framed ${
            showPopup ? "show" : ""
          }`}
        >
          <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
            <div>
              <WeaponThrowDice dices={dices} values={bab.map(att => att + bucklerMls)} weapon={weapon} />
            </div>

            <div>
              <WeaponDamageDice dices={dices} weapon={weapon} dmg={dmg} />
            </div>
          </div>
          {newTargetMod?.map((mod, index) => (
            <div
              key={index}
              style={{ display: "grid", gridTemplateColumns: "auto auto" }}
            >
              {mod && (
                <>
                  <div>
                    <WeaponThrowDice
                      dices={dices}
                      values={bab.map(att => att + bucklerMls)}
                      weapon={weapon}
                      targetMod={mod}
                    />
                  </div>
                  <div>
                    <WeaponDamageDice dices={dices} weapon={weapon} dmg={dmg} />
                  </div>
                </>
              )}
            </div>
          ))}
        </span>
      </div>
    </>
  );
};
