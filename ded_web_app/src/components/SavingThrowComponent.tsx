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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto auto"
        }}
      >
        <div>
          <p></p>
        </div>
        <div>
          <p>tot</p>
        </div>
        <div>
          <p>save</p>
        </div>
        <div>
          <p>ab</p>
        </div>
        <div>
          <p>other</p>
        </div>
        {saving.map((save) => (
          <SavingThrowOne key={save.id} save={save} listOfBonus={listOfBonus} />
        ))}
      </div>
        {listOfSpellResistance.map((sR, index) =>
          sR.bonus > 0 ? (
            <div key={index}>
              <p>Spell Resistence: {sR.bonus}</p>
            </div>
          ) : null
        )}
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
    <>
      <div>
        <p>
          <D20Popup
            textOrWeapon={save.text + ":"}
            value={save.tot.number}
            modifiers={listOfBonus}
          />
        </p>
      </div>
      <div>
        <p style={{ color: "orange" }}>
          {save.tot.sign}
          {save.tot.number}
        </p>
      </div>
      <div>
        <p>
          {save.save.sign}
          {save.save.number}
        </p>
      </div>
      <div>
        <p>
          {save.ab.sign}
          {save.ab.number}
        </p>
      </div>
      <div>
        <p>
          {save.other.sign}
          {save.other.number}
        </p>
      </div>
    </>
  );
};
