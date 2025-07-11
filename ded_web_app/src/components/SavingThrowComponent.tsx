import { abilityBackgroundColor } from "./Abilitys/Colors";
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

  const baseSaveBonus = char.savingThrow.reduce(
    (totSt, sT) =>
      totSt +
      sT.resistance.reduce(
        (totRes, res) =>
          totRes +
          (res.type === "SAVING" && res.target === null
            ? Number(res.bonus)
            : 0),
        0
      ),
    0
  );

  const fortitude: AllModifiersInThrow = {
    tot: {
      value: signAndCount([
        char.baseSave.fortitude,
        char.adjBonus.savingThrow,
        constitutionMod,
        baseSaveBonus
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
      },
      {
        value: signAndCount([baseSaveBonus]),
        mod: "bonus"
      }
    ]
  };
  const reflex: AllModifiersInThrow = {
    tot: {
      value: signAndCount([
        char.baseSave.reflex,
        char.adjBonus.savingThrow,
        dexterityMod,
        baseSaveBonus
      ]),
      mod: "reflex"
    },
    allMod: [
      {
        value: signAndCount([char.baseSave.reflex, char.adjBonus.savingThrow]),
        mod: "base"
      },
      { value: signAndCount([dexterityMod]), mod: "dex" },
      {
        value: signAndCount([baseSaveBonus]),
        mod: "bonus"
      }
    ]
  };
  const will: AllModifiersInThrow = {
    tot: {
      value: signAndCount([
        char.baseSave.will,
        char.adjBonus.savingThrow,
        wisdomMod,
        baseSaveBonus
      ]),
      mod: "will"
    },
    allMod: [
      {
        value: signAndCount([char.baseSave.will, char.adjBonus.savingThrow]),
        mod: "base"
      },
      { value: signAndCount([wisdomMod]), mod: "wis" },
      {
        value: signAndCount([baseSaveBonus]),
        mod: "bonus"
      }
    ]
  };
  const modResistance: Resistance[] = char.savingThrow.flatMap(
    (sT) => sT.resistance
  );

  const allDice: AllModifiersInDiceProps = {
    list: [
      {
        id: 1,
        color: abilityBackgroundColor(false, "CONSTITUTION"),
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
        id: 2,
        color: abilityBackgroundColor(false, "DEXTERITY"),
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
        id: 3,
        color: abilityBackgroundColor(false, "WISDOM"),
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
      <h2 className="rpgui-container-framed golden-2">Saving Throws</h2>

      <AllModifiersInDice20 list={allDice.list} />
    </>
  );
};

export const SavingSummaryThrowComponent: React.FC<
  SavingThrowComponentProps
> = ({ char }) => {
  const dexterityMod: number = BonusAbilities(char.abilitys, "DEX");
  const constitutionMod: number = BonusAbilities(char.abilitys, "COS");
  const wisdomMod: number = BonusAbilities(char.abilitys, "WIS");
  const fortitude: number = Math.floor(
    char.baseSave.fortitude + char.adjBonus.savingThrow + constitutionMod
  );
  const reflex: number = Math.floor(
    char.baseSave.reflex + char.adjBonus.savingThrow + dexterityMod
  );
  const will: number = Math.floor(
    char.baseSave.will + char.adjBonus.savingThrow + wisdomMod
  );
  return (
    <div>
      <p>
        fortitude: {fortitude} / reflex: {reflex} / will: {will}
      </p>
    </div>
  );
};
