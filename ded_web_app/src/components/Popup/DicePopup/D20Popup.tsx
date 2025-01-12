import { useState } from "react";
import { ThrowDice20 } from "../../Dice/Functions";
import { AllModifiersInThrow, DicePopupProps } from "./Interface";
import { ThrowDice } from "../../Dice/ThrowDice";
import { D12Popup } from "./D12Popup";

export const D20Popup: React.FC<DicePopupProps> = ({
  textOrWeapon,
  value,
  modifiers
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [dice, setDice] = useState(0);

  const text: string = textOrWeapon + ":";

  const togglePopup = (show: boolean) => {
    if (show) {
      const lancio = ThrowDice20();
      setDice(lancio);
    }
    setShowPopup(show);
  };

  return (
    <div
      className="popup"
      onClick={() => togglePopup(true)}
      onMouseLeave={() => togglePopup(false)}
      style={{ color: "yellow" }}
    >
      {text}

      <span
        style={{ width: 300, textAlign: "center" }}
        className={`popuptext rpgui-container-framed ${
          showPopup ? "show" : ""
        }`}
      >
        <ThrowDice dice={dice} value={value} />
        {/* attackRoll */}
        {modifiers?.attackRoll != null ? (
          <>
            {modifiers.attackRoll.map(
              (att, index) =>
                att && (
                  <D20PopupModifiers
                    dice={dice}
                    value={value}
                    target={att.target}
                    bonus={Number(att.bonus)}
                    key={index}
                  />
                )
            )}
          </>
        ) : null}

        {/* specialAttacks */}
        {modifiers?.specialAttacks != null ? (
          <>
            {modifiers.specialAttacks &&
              modifiers.specialAttacks.map(
                (att, index) =>
                  att && (
                    <D20PopupModifiers
                      dice={dice}
                      value={value}
                      target={[att.title]}
                      bonus={att.value}
                      key={index}
                    />
                  )
              )}
          </>
        ) : null}

        {/* saving */}
        {modifiers?.savingThrow != null ? (
          <>
            {modifiers.savingThrow.map(
              (save) =>
                save.target &&
                save.target.map((target, index) =>
                  target && save.type === "IMMUNITY" ? (
                    `immune to ${target.toString()}`
                  ) : (
                    <D20PopupModifiers
                      dice={dice}
                      value={value}
                      target={[target]}
                      bonus={Number(save.bonus)}
                      key={index}
                    />
                  )
                )
            )}
          </>
        ) : null}
        {/* saving */}
        {modifiers?.skills != null ? (
          <>
            <D20PopupModifiers
              dice={dice}
              value={value}
              target={modifiers.skills.target ? modifiers.skills.target : null}
              bonus={null}
            />
          </>
        ) : null}
      </span>
    </div>
  );
};

export type AttackRollProps = {
  dice: number | null;
  value: number | null;
  target: string[] | null;
  bonus: number | null;
};

export const D20PopupModifiers: React.FC<AttackRollProps> = ({
  dice,
  value,
  target,
  bonus
}) => {
  return (
    <>
      {dice && value && (
        <ThrowDice dice={dice} value={dice + (bonus ? bonus : 0)} />
      )}{" "}
      {target != null ? target.join(", ") : null}
    </>
  );
};

export type AllModifiersInDiceProps = {
  list: {
    id: number;
    color: string;
    dice: DicePopupProps;
    // textOrWeapon: string;
    // value: number;
    // modifiers: DiceModifiers;
    allMod: AllModifiersInThrow;
    // tot: {
    // value: SignAndNumber;
    // mod: string; };
    // allMod: {
    // value: SignAndNumber;
    // mod: string; }[];
  }[];
};

export const AllModifiersInDice20: React.FC<AllModifiersInDiceProps> = ({
  list
}) => {
  return (
    <>
      {list.map(
        (mod, index) =>
          mod && (
            <div className={mod.color} style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }} key={mod.id}>
              <div style={{flex: 1}}>
                <p>
                  <D20Popup
                    key={index}
                    textOrWeapon={mod.dice.textOrWeapon}
                    value={Math.floor(mod.dice.value)}
                    modifiers={mod.dice.modifiers}
                  />
                </p>
              </div>
              <div style={{flex: 1}}>
                <p style={{ color: "orange" }}>
                  {mod.allMod.tot.value.sign}
                  {Math.floor(mod.allMod.tot.value.number)}{" "}
                </p>
              </div>

              {mod.allMod.allMod.map((modif, index) => (
                <div key={index} style={{flex: 1}}>
                  <p>
                    {modif.value.sign}
                    {Math.floor(modif.value.number)}
                    {modif.mod}{" "}
                  </p>
                </div>
              ))}
            </div>
          )
      )}
    </>
  );
};
export const AllModifiersInDice12: React.FC<AllModifiersInDiceProps> = ({
  list
}) => {
  return (
    <div className="rpgui-container-framed-grey-mini dexterity" style={{ display: "flex" , flexWrap: "wrap", justifyContent: "space-between"}}>
      {list.map((mod, index) => (
        <div key={index}>
        <p>
          <D12Popup key={index} {...mod.dice} />
          <span style={{ color: "orange" }}>
            {mod.allMod.tot.value.sign}
            {mod.allMod.tot.value.number}{" "}
          </span>
          {mod.allMod.allMod.map((mod, index) => (
            <span key={index}>
              {mod.value.sign}
              {mod.value.number}
              {mod.mod}{" "}
            </span>
          ))}
        </p>
        </div>
      ))}
    </div>
  );
};
