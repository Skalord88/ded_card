import { BonusAbilities, SignAndCount, SignNumber } from "../../functions";
import { SpecialAttacks } from "../../interfaces";
import { D20Popup } from "../../Popup/DicePopup/D20Popup";
import { CharToModify } from "../../Prerequisite/functions/modifyCharacter";

export type BaseAttackProp = {
  char: CharToModify;
};

export type AttacksList = {
  text: string;
  value: number;
  mod: SpecialAttacks[];
};

export const BaseAttack: React.FC<BaseAttackProp> = ({ char }) => {

    const forAllAttackRoll: number = char.attackRoll.reduce(
        (tot, at) =>
          tot + (at.target == null && at.bonus != null ? Number(at.bonus) : 0),
        0
      );

  const attacksList: AttacksList[] = [
    {
      text: "base att bns",
      value: char.bab,
      mod: []
    },
    {
      text: "bullRush",
      value: char.specialAttacks.reduce((tot, spec) => tot + spec.bullRush, 0),
      mod: char.specialAttacks
    },
    {
      text: "charge",
      value: char.specialAttacks.reduce((tot, spec) => tot + spec.charge, 0),
      mod: char.specialAttacks
    },
    {
      text: "disarm",
      value: char.specialAttacks.reduce((tot, spec) => tot + spec.disarm, 0),
      mod: char.specialAttacks
    },
    {
      text: "grapple",
      value: char.specialAttacks.reduce((tot, spec) => tot + spec.grapple, 0),
      mod: char.specialAttacks
    },
    {
      text: "overrun",
      value: char.specialAttacks.reduce((tot, spec) => tot + spec.overrun, 0),
      mod: char.specialAttacks
    },
    {
      text: "sunder",
      value: char.specialAttacks.reduce((tot, spec) => tot + spec.overrun, 0),
      mod: char.specialAttacks
    },
    {
      text: "strenghtAtt",
      value: BonusAbilities(char.abilitys, "STR") + char.bab + forAllAttackRoll,
      mod: []
    },
    {
      text: "dexterityAtt",
      value: BonusAbilities(char.abilitys, "DEX") + char.bab + forAllAttackRoll,
      mod: []
    }
  ];

  return (
    <>
      <div>
        <h2 className="rpgui-container-framed-golden-2">Attacks</h2>
        {attacksList.map((att) =>
          att.text === "base att bns" ? (
            <div>
              <p>
                <D20Popup
                  textOrWeapon={att.text}
                  value={att.value}
                  modifiers={null}
                />
                {SignNumber(att.value)}
                {att.value}
              </p>
            </div>
          ) : att.value !== 0 && att.mod.length > 0 ? (
            <div>
              <p>
                <D20Popup
                  textOrWeapon={att.text}
                  value={char.bab + att.value}
                  modifiers={att.mod}
                />
                {SignNumber(char.bab + att.value)}
                {char.bab + att.value}
              </p>
            </div>
          ) : null
        )}
      </div>
    </>
  );
};
