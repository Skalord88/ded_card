import { Abilitys } from "./Abilitys/Interface";
import { CharacterPc, savingThrows } from "./interfaces";
import {
  FindInMoreLengthModifier,
  FindInOneLengthModifier
} from "./Modifiers/Function";
import { Modifiers } from "./Modifiers/ModifierInterface";
import { D20Popup } from "./Popup/DicePopup/D20Popup";
import { FindAllAdjLevel } from "./Race/Function";
import { CountSavingThrowFromClassPc } from "./Saving/Functions";
import { Saving, SavingProps } from "./Saving/Saving";

export type SavingThrowComponentProps = {
  char: CharacterPc;
  abilitys: Abilitys;
  modifications: Modifiers[];
};

export const SavingThrowComponent: React.FC<SavingThrowComponentProps> = ({
  char,
  abilitys,
  modifications
}) => {
  const lvAdjsaving: number = FindAllAdjLevel(char);
  const sT: savingThrows = CountSavingThrowFromClassPc(char.classPcList);
  const savingBonusAll: number = FindInOneLengthModifier(
    modifications,
    "SAVING"
  );
  const saving: SavingProps[] = Saving(
    abilitys,
    {
      fortitude: Math.floor(sT.fortitude + lvAdjsaving * 0.5),
      reflex: Math.floor(sT.reflex + lvAdjsaving * 0.5),
      will: Math.floor(sT.will + lvAdjsaving * 0.5)
    },
    savingBonusAll,
    modifications
  );

  const listOfBonus: Modifiers[] = FindInMoreLengthModifier(
    modifications,
    "SAVING"
  );
  const listOfSpellResistance: Modifiers[] = FindInMoreLengthModifier(
    modifications,
    "SPELL_RESISTANCE"
  );

  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Saving Throws</h2>

      <SavingThrowOne save={saving[0]} listOfBonus={listOfBonus} />
      <SavingThrowOne save={saving[1]} listOfBonus={listOfBonus} />
      <SavingThrowOne save={saving[2]} listOfBonus={listOfBonus} />

      <div style={{ display: "flex" }}>
        <p>
          Spell Resistence:{" "}
          {listOfSpellResistance.map((sR) => (
            <p>{sR.bonus}</p>
          ))}
        </p>
      </div>
    </>
  );
};

export type SavingThrowOneProps = {
  save: SavingProps;
  listOfBonus: Modifiers[];
};

export const SavingThrowOne: React.FC<SavingThrowOneProps> = ({
  save,
  listOfBonus
}) => {
  return (
    <div style={{ display: "flex" }}>
      <p>
        <D20Popup
          key={save.id}
          textOrWeapon={save.text + ":"}
          value={save.tot.number}
          modifiers={listOfBonus}
        />
      </p>
      <p>
        {save.tot.sign}
        {save.tot.number}
      </p>
      <p>
        ({save.save.sign}
        {save.save.number} save)
      </p>
      <p>
        ({save.ab.sign}
        {save.ab.number} ab)
      </p>
      <p>
        ({save.other.sign}
        {save.other.number} oth)
      </p>
    </div>
  );
};
