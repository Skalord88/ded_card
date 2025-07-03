import { abilityBackgroundColor } from "../../Abilitys/Colors";
import { BonusAbilities, signAndCount, SignNumber } from "../../functions";
import {
    AllModifiersInDice20,
    AllModifiersInDiceProps
} from "../../Popup/DicePopup/D20Popup";
import {
    AllModifiersInThrow,
    DiceModifiers
} from "../../Popup/DicePopup/Interface";
import { CharToModify } from "../../Prerequisite/functions/modifyCharacter";
import { sepcialAttacksToList } from "../function";

export type BaseAttackProp = {
  char: CharToModify;
};

export const BaseAttack: React.FC<BaseAttackProp> = ({ char }) => {
  const forAllAttackRoll: number = char.attackRoll.mono.reduce(
    (tot, at) =>
      tot + (at.target == null && at.bonus != null ? Number(at.bonus) : 0),
    0
  );
  const modifiersAttackRoll: DiceModifiers = {
    attackRoll: char.attackRoll.target,
  };

  const modifiersSpecialAttacks: DiceModifiers = {
    specialAttacks: sepcialAttacksToList(char.specialAttacks),
  };

  const adjBab: AllModifiersInThrow = {
    tot: { value: signAndCount([char.bab, forAllAttackRoll]), mod: "bab" },
    allMod: []
  };

  const bab: AllModifiersInThrow = {
    tot: adjBab.tot,
    allMod: [
      { value: signAndCount([char.bab]), mod: "bab" },
      {
        value: signAndCount([Number(char.size.modifiers?.attackRoll?.bonus ?? 0)]),
        mod: "size"
      }
    ]
  };
  const strengthMod: number = BonusAbilities(char.abilitys, "STR");
  const strenghtAtt: AllModifiersInThrow = {
    tot: {
      value: signAndCount([adjBab.tot.value.number, strengthMod]),
      mod: "str att"
    },
    allMod: [
      { value: signAndCount([char.bab]), mod: "bab" },
      {
        value: signAndCount([Number(char.size.modifiers?.attackRoll?.bonus ?? 0)]),
        mod: "siz"
      },
      { value: signAndCount([strengthMod]), mod: "str" }
    ]
  };
  const dexterityMod: number = BonusAbilities(char.abilitys, "DEX");
  const dexterityAtt: AllModifiersInThrow = {
    tot: {
      value: signAndCount([adjBab.tot.value.number, dexterityMod]),
      mod: "dex att"
    },
    allMod: [
      { value: signAndCount([char.bab]), mod: "bab" },
      {
        value: signAndCount([Number(char.size.modifiers?.attackRoll?.bonus ?? 0)]),
        mod: "siz"
      },
      { value: signAndCount([dexterityMod]), mod: "dex" }
    ]
  };
  const grapple: AllModifiersInThrow = {
    tot: {
      value: signAndCount([
        char.bab,
        Number(char.size.modifiers?.specialAttacks?.grapple ?? 0),
        strengthMod
      ]),
      mod: "grp"
    },
    allMod: [
      { value: signAndCount([char.bab]), mod: "bab" },
      {
        value: signAndCount([
          Number(char.size.modifiers?.specialAttacks?.grapple ?? 0)
        ]),
        mod: "grp"
      },
      { value: signAndCount([strengthMod]), mod: "str" }
    ]
  };

  const allDice: AllModifiersInDiceProps = {
    list: [
      {
        id: 1,
        color: abilityBackgroundColor(false, ""),
        dice: {
          textOrWeapon: bab.tot.mod,
          value: bab.tot.value.number,
          modifiers: modifiersAttackRoll
        },
        allMod: bab
      },
      {
        id: 2,
        color: abilityBackgroundColor(false, "STRENGTH"),
        dice: {
          textOrWeapon: strenghtAtt.tot.mod,
          value: strenghtAtt.tot.value.number,
          modifiers: modifiersAttackRoll
        },
        allMod: strenghtAtt
      },
      {
        id: 3,
        color: abilityBackgroundColor(false, "DEXTERITY"),
        dice: {
          textOrWeapon: dexterityAtt.tot.mod,
          value: dexterityAtt.tot.value.number,
          modifiers: modifiersAttackRoll
        },
        allMod: dexterityAtt
      },
      {
        id: 4,
        color: abilityBackgroundColor(false, "STRENGTH"),
        dice: {
          textOrWeapon: grapple.tot.mod,
          value: char.bab,
          modifiers: modifiersSpecialAttacks
        },
        allMod: grapple
      }
    ]
  };

  return (
    <div >
      <h2 className="rpgui-container-framed golden-2">Bab</h2>
      <AllModifiersInDice20 list={allDice.list} />
    </div>
  );
};

export const BaseSummaryAttack: React.FC<BaseAttackProp> = ({ char }) => {

  const totBab: number = char.bab + Number(char.size.modifiers?.attackRoll?.bonus ?? 0);
  const totGrapple: number = totBab + Number(char.size.modifiers?.specialAttacks?.grapple ?? 0);

  return(
    <div>
      <p>Base Attack/Grapple: {SignNumber(totBab) + totBab}/{SignNumber(totGrapple) + totGrapple} </p>
    </div>
  )
}
