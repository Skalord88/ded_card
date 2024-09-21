import { FormattingText } from "./Formatting/Function";
import { BonusAbilities, SignAndCount } from "./functions";
import { CharacterPc, savingThrows } from "./interfaces";
import {
  FindInMoreLengthModifier,
  FindInOneLengthModifier
} from "./Modifiers/Function";
import { Modifiers } from "./Modifiers/ModifierInterface";
import { D20Popup } from "./Popup/DicePopup/D20Popup";
import { CountSavingThrowFromClassPc } from "./Saving/Functions";
import { Saving } from "./Saving/Saving";

export type SavingThrowComponentProps = {
  char: CharacterPc;
  modifications: Modifiers[];
};

export const SavingThrowComponent: React.FC<SavingThrowComponentProps> = ({
  char,
  modifications
}) => {
  const sT: savingThrows = CountSavingThrowFromClassPc(char.classPcList);
  const savingBonusAll: number = FindInOneLengthModifier(
    modifications,
    "SAVING"
  );
  const saving = Saving(char, sT, savingBonusAll)

  const listOfBonus: Modifiers[] = FindInMoreLengthModifier(
    modifications,
    "SAVING"
  );

  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Saving Throws</h2>
      <div style={{ display: "grid" }}>
        <div
          style={{
            gridColumn: 1,
            gridRow: 1
          }}
        >
          <p className="rpgui-center" style={{ display: "grid" }}>
            <div></div>
            <div>tot</div>
            <div>val</div>
            <div>abi</div>
            <div>oth</div>
            <div style={{ gridColumn: 6 }}></div>

            <D20Popup
              textOrWeapon="for: "
              value={saving.forTot.number}
              modifiers={listOfBonus}
            />
            <div style={{ backgroundColor: "grey" }}>
              {saving.forTot.sign}
              {saving.forTot.number}
            </div>
            <div>
              {saving.for.sign}
              {saving.for.number}
            </div>
            <div>
              {saving.forAb.sign}
              {saving.forAb.number}
            </div>
            <div>
              {saving.forOther.sign}
              {saving.forOther.number}
            </div>
            <div></div>

            <D20Popup
              key={saving.idRef}
              textOrWeapon="ref: "
              value={saving.refTot.number}
              modifiers={listOfBonus}
            />
            <div style={{ backgroundColor: "grey" }}>
              {saving.refTot.sign}
              {saving.refTot.number}
            </div>
            <div>
              {saving.ref.sign}
              {saving.ref.number}
            </div>
            <div>
              {saving.refAb.sign}
              {saving.refAb.number}
            </div>
            <div>
              {saving.refOther.sign}
              {saving.refOther.number}
            </div>

            <div></div>

            <D20Popup
              key={saving.idWill}
              textOrWeapon="will: "
              value={saving.willTot.number}
              modifiers={listOfBonus}
            />
            <div style={{ backgroundColor: "grey" }}>
              {saving.willTot.sign}
              {saving.willTot.number}
            </div>
            <div>
              {saving.will.sign}
              {saving.will.number}
            </div>
            <div>
              {saving.willAb.sign}
              {saving.willAb.number}
            </div>
            <div>
              {saving.willOther.sign}
              {saving.willOther.number}
            </div>
            <div></div>
          </p>
        </div>
        <div
          className="rpgui-container-framed-grey"
          style={{
            gridColumn: 2,
            gridRow: "1 / span 2"
          }}
        >
          <p>Special:</p>
          {listOfBonus ? (
            <>
              {listOfBonus.map((mod) => {
                return (
                  <p>
                    {FormattingText(mod.targets[0])}
                    {" - " + FormattingText(mod.targets[1])} {mod.bonus}
                  </p>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>
        <p>Spell Resistence:</p>
      </div>
    </>
  );
};
