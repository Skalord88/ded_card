import { CharProps } from "./CharacterData";
import { BonusAbilities } from "./functions";

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
      <div className="rpgui-container-framed-grey">
        <h2 className="rpgui-container-framed-golden-2">Saving Throws</h2>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 3 }}>
            <div className="grid-table-six">
              <div></div>
              <div className="rpgui-container-framed-grey">TOT</div>
              <div className="rpgui-container-framed-grey">VALUE</div>
              <div className="rpgui-container-framed-grey">ABILITY</div>
              <div className="rpgui-container-framed-grey">OTHER</div>
              <div className="rpgui-container-framed-grey">///</div>

              <div className="rpgui-container-framed-grey">fortitude:</div>
              <div className="rpgui-container-framed-grey">{saving.forTot}</div>
              <div className="rpgui-container-framed-grey">{saving.for}</div>
              <div className="rpgui-container-framed-grey">{saving.forAb}</div>
              <div className="rpgui-container-framed-grey">{saving.forOther}</div>
              <div className="rpgui-container-framed-grey"></div>
             

              <div className="rpgui-container-framed-grey">reflex:</div>
              <div className="rpgui-container-framed-grey">{saving.refTot}</div>
              <div className="rpgui-container-framed-grey">{saving.ref}</div>
              <div className="rpgui-container-framed-grey">{saving.refAb}</div>
              <div className="rpgui-container-framed-grey">{saving.refOther}</div>
              
              <div className="rpgui-container-framed-grey"></div>

              <div className="rpgui-container-framed-grey">will:</div>
              <div className="rpgui-container-framed-grey">
                {saving.willTot}
              </div>
              <div className="rpgui-container-framed-grey">{saving.will}</div>
              <div className="rpgui-container-framed-grey">{saving.willAb}</div>
              <div className="rpgui-container-framed-grey">{saving.willOther}</div>
              <div className="rpgui-container-framed-grey"></div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div className="rpgui-container-framed-grey">
                <p>Special:</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
