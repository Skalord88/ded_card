import { CharProps } from "./CharacterData";
import { BonusAbilities, SignAndCount } from "./functions";
import { savingThrows } from "./interfaces";
import { D20Popup } from "./Popup/DicePopup/D20Popup";
import { CountSavingThrowFromClassPc } from "./Saving/Functions";

export const SavingThrowComponent: React.FC<CharProps> = ({ char }) => {
  const sT: savingThrows = CountSavingThrowFromClassPc(char.classPcList)
  const saving = {
    for: SignAndCount([sT.fortitude]),
    forTot: SignAndCount([
      sT.fortitude,
      BonusAbilities(char.abilitys, "COS")
    ]),
    forAb: SignAndCount([BonusAbilities(char.abilitys, "COS")]),
    forOther: 0,
    ///
    ref: SignAndCount([sT.reflex]),
    refTot: SignAndCount([
      sT.reflex,
      BonusAbilities(char.abilitys, "DEX")
    ]),
    refAb: SignAndCount([BonusAbilities(char.abilitys, "DEX")]),
    refOther: 0,
    ///
    will: SignAndCount([sT.will]),
    willTot: SignAndCount([
      sT.will,
      BonusAbilities(char.abilitys, "WIS")
    ]),
    willAb: SignAndCount([BonusAbilities(char.abilitys, "WIS")]),
    willOther: 0
  };
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
              <div>{saving.forOther}</div>
              <div></div>

              <D20Popup
                textOrWeapon="ref: "
                value={saving.refTot.number}
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
              <div>{saving.refOther}</div>

              <div></div>

              <D20Popup
                textOrWeapon="will: "
                value={saving.willTot.number}
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
              <div>{saving.willOther}</div>
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
            Special:
          </div>
        </div>
        <div>Spell Resistence:</div>
    </>
  );
};
