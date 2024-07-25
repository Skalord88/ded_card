import { CharProps } from "./CharacterData";
import { BonusAbilities } from "./functions";
import { D20Popup } from "./Popup/DicePopup/D20Popup";

export const SavingThrowComponent: React.FC<CharProps> = ({ char }) => {
  const saving = {
    for: char.savingThrows.fortitude + BonusAbilities(char.abilitys, "COS"),
    forTot: char.savingThrows.fortitude + BonusAbilities(char.abilitys, "COS"),
    forAb: BonusAbilities(char.abilitys, "COS"),
    forOther: 0,
    ref: char.savingThrows.reflex + BonusAbilities(char.abilitys, "DEX"),
    refTot: char.savingThrows.reflex + BonusAbilities(char.abilitys, "DEX"),
    refAb: BonusAbilities(char.abilitys, "DEX"),
    refOther: 0,
    will: char.savingThrows.will + BonusAbilities(char.abilitys, "WIS"),
    willTot: char.savingThrows.will + BonusAbilities(char.abilitys, "WIS"),
    willAb: BonusAbilities(char.abilitys, "WIS"),
    willOther: 0
  };
  return (
    <>
      <div
        className="rpgui-container-framed-grey"
        style={{
          gridColumn: "1 / span 2",
          gridRow: "3 / span 2"
        }}
      >
        <h2 className="rpgui-container-framed-golden-2">Saving Throws</h2>
        <div style={{ display: "grid" }}>
          <div
            style={{
              gridColumn: 1,
              gridRow: 1
            }}
          >
            <p className="rpgui-center" style={{ display:"grid" }}>

              <div></div>
              <div>tot</div>
              <div>val</div>
              <div>abi</div>
              <div>oth</div>
              <div style={{gridColumn:6}}></div>


              <D20Popup text="for: " value={saving.forTot} critic={false} />
              <div style={{ backgroundColor: "grey"}}>{saving.forTot}</div>
              <div>{saving.for}</div>
              <div>{saving.forAb}</div>
              <div>
                {saving.forOther}
              </div>
              <div></div>

              <D20Popup text="ref: " value={saving.refTot} critic={false} />
              <div style={{ backgroundColor: "grey"}}>{saving.refTot}</div>
              <div>{saving.ref}</div>
              <div>{saving.refAb}</div>
              <div>
                {saving.refOther}
              </div>

              <div></div>

              <D20Popup text="will: " value={saving.willTot} critic={false} />
              <div style={{ backgroundColor: "grey"}}>
                {saving.willTot}
              </div>
              <div>{saving.will}</div>
              <div>{saving.willAb}</div>
              <div>
                {saving.willOther}
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
          >Special:
          </div>
        </div>
        <div>Spell Resistence:</div>
      </div>
    </>
  );
};
