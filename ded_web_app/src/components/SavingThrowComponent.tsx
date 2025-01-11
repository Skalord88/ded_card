import { BonusAbilities, signAndCount } from "./functions";
import {
    AllModifiersInDice20,
    AllModifiersInDiceProps
} from "./Popup/DicePopup/D20Popup";
import { AllModifiersInThrow } from "./Popup/DicePopup/Interface";
import { CharToModify } from "./Prerequisite/functions/modifyCharacter";
import { Resistance } from "./Saving/interface";

export type SavingThrowComponentProps = {
  char: CharToModify;
};

export const SavingThrowComponent: React.FC<SavingThrowComponentProps> = ({
  char
}) => {
  const dexterityMod: number = BonusAbilities(char.abilitys, "DEX");
  const constitutionMod: number = BonusAbilities(char.abilitys, "COS");
  const wisdomMod: number = BonusAbilities(char.abilitys, "WIS");

  const fortitude: AllModifiersInThrow = {
    tot: {
      value: signAndCount([
        char.baseSave.fortitude,
        char.adjBonus.savingThrow,
        constitutionMod
      ]),
      mod: "fortitude"
    },
    allMod: [
      {
        value: signAndCount([
          char.baseSave.fortitude,
          char.adjBonus.savingThrow
        ]),
        mod: "base"
      },
      {
        value: signAndCount([constitutionMod]),
        mod: "cos"
      }
    ]
  };
  const reflex: AllModifiersInThrow = {
    tot: {
      value: signAndCount([
        char.baseSave.reflex,
        char.adjBonus.savingThrow,
        dexterityMod
      ]),
      mod: "reflex"
    },
    allMod: [
      {
        value: signAndCount([char.baseSave.reflex, char.adjBonus.savingThrow]),
        mod: "base"
      },
      { value: signAndCount([dexterityMod]), mod: "dex" }
    ]
  };
  const will: AllModifiersInThrow = {
    tot: {
      value: signAndCount([
        char.baseSave.will,
        char.adjBonus.savingThrow,
        wisdomMod
      ]),
      mod: "will"
    },
    allMod: [
      {
        value: signAndCount([char.baseSave.will, char.adjBonus.savingThrow]),
        mod: "base"
      },
      { value: signAndCount([wisdomMod]), mod: "wis" }
    ]
  };
  const modResistance: Resistance[] = char.savingThrow.flatMap(
    (sT) => sT.resistance
  );

  const allDice: AllModifiersInDiceProps = {
    list: [
      {
        color: "CONSTITUTION",
        dice: {
          textOrWeapon: fortitude.tot.mod,
          value: fortitude.tot.value.number,
          modifiers: {
            savingThrow: modResistance
          }
        },
        allMod: fortitude
      },
      {
        color: "DEXTERITY",
        dice: {
          textOrWeapon: reflex.tot.mod,
          value: reflex.tot.value.number,
          modifiers: {
            savingThrow: modResistance
          }
        },
        allMod: reflex
      },
      {
        color: "WISDOM",
        dice: {
          textOrWeapon: will.tot.mod,
          value: will.tot.value.number,
          modifiers: {
            savingThrow: modResistance
          }
        },
        allMod: will
      }
    ]
  };

  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Saving Throws</h2>

      <AllModifiersInDice20 list={allDice.list} />

    </>
  );
};
