import { BonusAbilities, signAndCount } from "../functions";
import {
  AllModifiersInDice12,
  AllModifiersInDiceProps
} from "../Popup/DicePopup/D20Popup";
import { AllModifiersInThrow } from "../Popup/DicePopup/Interface";
import { CharToModify } from "../Prerequisite/functions/modifyCharacter";

export type InitiativeProps = {
  char: CharToModify;
};

export const Initiative: React.FC<InitiativeProps> = ({ char }) => {
  const dexterityMod: number = BonusAbilities(char.abilitys, "DEX");
  const initiative: AllModifiersInThrow = {
    tot: {
      value: signAndCount([char.initiative, dexterityMod]),
      mod: "tot"
    },
    allMod: [{ value: signAndCount([dexterityMod]), mod: "dex" }]
  };

  const allDice: AllModifiersInDiceProps = {
    list: [
      {
        color: "DEXTERITY",
        dice: {
          textOrWeapon: initiative.tot.mod,
          value: initiative.tot.value.number,
          modifiers: null
        },
        allMod: initiative
      }
    ]
  };

  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Initiative</h2>

      <AllModifiersInDice12 list={allDice.list} />
    </>
  );
};
