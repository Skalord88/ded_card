import { Fragment } from "react/jsx-runtime";
import { DiceText } from "../../Dice/Functions";
import { Weapon } from "../../interfaces";
import { WeaponElement } from "../../ModifiedCharacter/interface/ModifiedCharacter";
import { Popup } from "../../Popup/Popup";
import { noneWeapon } from "../../variables";
import { SummaryCharProps } from "../SummaryChar";
import { TotAndBonus, TotAndBonusElement } from "./TotAndBonus";
import { AttackOptionsElement } from "../../../pages/Fight";

export type SummaryCharAttacksTemplateProps = {
  borderText?: string;
  children: React.ReactNode;
};

export const SummaryCharAttacksTemplate: React.FC<
  SummaryCharAttacksTemplateProps
> = ({ borderText, children }) => {
  return (
    <div
      className={!borderText ? "rpgui-container-framed golden" : borderText}
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr",
        gap: "10px",
        alignItems: "center"
      }}
    >
      {children}
    </div>
  );
};

export const SummaryCharAttacks: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
  const elementMelee: AttackOptionsElement = {
    element: modCharacter.attacks?.firstMelee,
    area: "",
    show: true
  };
  const elementRanged: AttackOptionsElement = {
    element: modCharacter.attacks?.firstRanged,
    area: "",
    show: true
  };
  return (
    <>
      <div>
        <p>Attack:</p>
      </div>
      <div>
        <SummaryCharAttacksSingleElement
          totAndBonusAtt={[false, true, false]}
          element={elementMelee}
          totAndBonusDmg={[false, true, false]}
        />
        {
          (modCharacter.attacks?.firstRanged?.weaponRanged
          || modCharacter.attacks?.firstRanged?.weaponThrown) && (
          <SummaryCharAttacksSingleElement
            totAndBonusAtt={[false, true, false]}
            element={elementRanged}
            totAndBonusDmg={[false, true, false]}
          />
        )}
      </div>
      <div>
        <p>Full Attack:</p>
      </div>
      <div>
        <MapAllAttacks modCharacter={modCharacter} />
      </div>
    </>
  );
};
export type SummaryCharAttacksSingleElementProps = {
  border?: string;
  totAndBonusAtt: [boolean, boolean, boolean];
  listBab: TotAndBonusElement[][];
  weapon: Weapon;
  totAndBonusDmg: [boolean, boolean, boolean];
};
export const SummaryCharAttacksSingleElement: React.FC<
  SummaryCharAttacksSingleElementProps
> = ({ border, totAndBonusAtt, listBab, weapon, totAndBonusDmg }) => {
  const attValue = listBab;
  const dmgValue = totAndBonusDmg[2];
  return (
    <SummaryCharAttacksTemplate borderText={border}>
      {attValue && attValue.map((a) => (
        <TotAndBonus
          show={totAndBonusAtt[0]}
          firstSign={totAndBonusAtt[1]}
          list={a}
          onlyTot={totAndBonusAtt[2]}
        />
      ))}
      <div>
        <span>{weapon?.name}</span>
      </div>

      <div>
        <span>{DiceText(weapon?.damage ?? "")}</span>
        <span> </span>
        <span>{DiceText(weapon?.critical ?? "")}</span>

        {Array.isArray(dmgValue) ? (
          <TotAndBonus
            show={totAndBonusDmg[0]}
            firstSign={totAndBonusDmg[1]}
            // tot={dmgValue}
            list={dmgValue}
            onlyTot={totAndBonusAtt[2]}
          />
        ) : (
          <TotAndBonus
            show={totAndBonusDmg[0]}
            firstSign={totAndBonusDmg[1]}
            tot={dmgValue}
            // list={dmgValue}
            onlyTot={totAndBonusAtt[2]}
          />
        )}
      </div>
    </SummaryCharAttacksTemplate>
  );
};

export const mapAllAttacksAreas = (
  elelments: (WeaponElement | undefined)[]
): { element: WeaponElement | undefined; area: string; show: boolean; selected?: boolean }[] => {
  return [
    // set1
    { element: elelments[0], area: "w1", show: true },
    {
      element: elelments[1],
      area: "w2",
      show: !elelments[0]?.weaponTwoHanded || false
    },
    {
      element: elelments[2],
      area: "wA",
      show: elelments[2]?.weaponLight || false
    },
    // { element: {}, area: "empty", show: false },
    // set2
    { element: elelments[3], area: "w21", show: true },
    {
      element: elelments[4],
      area: "w22",
      show: !elelments[3]?.weaponTwoHanded || false
    },
    {
      element: elelments[5],
      area: "w2A",
      show: elelments[5]?.weaponLight || false
    },
    // { element: {}, area: "empty", show: false }
  ];
};

export const MapAllAttacks: React.FC<SummaryCharProps> = ({ modCharacter }) => {
  const areas = mapAllAttacksAreas([
    modCharacter.attacks?.firstAttackSetOne || undefined,
    modCharacter.attacks?.secondAttackSetOne || undefined,
    modCharacter.attacks?.additionalAttackSetOne || undefined,
    modCharacter.attacks?.firstAttackSetTwo || undefined,
    modCharacter.attacks?.secondAttackSetTwo || undefined,
    modCharacter.attacks?.additionalAttackSetTwo || undefined
  ]);

  return (
    <div
    style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateAreas: `
      "w1 w2"
      "wA ."
      "w21 w22"
      "w2A ."
    `,
            gap: 8
          }}
    >
      {areas.map((area, index) => {
        if (area.show) {
          return (
            <div key={index} style={{ border: "1px solid red" }}>
              <div>
                <p>{area.element?.weapon?.name}</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
                {!area.element?.weaponRanged && (
                  <Fragment>
                    <div>
                      <span>{"melee: "}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "8px",
                        backgroundColor: "Brown"
                      }}
                    >
                      {area.element?.listBabMeleeSpecificBonus &&
                        area.element?.listBabMeleeSpecificBonus.map(
                          (n, index) => {
                            return (
                              <div key={index}>
                                <Popup bonusList={n} />
                              </div>
                            );
                          }
                        )}
                      <div>
                        <span>
                          {DiceText(area.element?.weapon?.damage ?? "")}
                        </span>
                        <span> </span>
                        <span>
                          {DiceText(area.element?.weapon?.critical ?? "")}
                        </span>
                        {/* <span>{area.element?.weapon?.damage}</span> */}
                        <TotAndBonus
                          show={false}
                          firstSign={true}
                          list={area.element?.toListMeleeDamage || []}
                        />
                      </div>
                    </div>
                  </Fragment>
                )}
                {(area.element?.weaponRanged || area.element?.weaponThrown) &&
                  area.element?.listBabRangedSpecificBonus && (
                    <Fragment>
                      <div>
                        <span>{"ranged: "}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "8px",
                          backgroundColor: "CornflowerBlue"
                        }}
                      >
                        {area.element?.listBabRangedSpecificBonus.map(
                          (n, index) => {
                            return (
                              <div key={index}>
                                <Popup bonusList={n} />
                              </div>
                            );
                          }
                        )}
                        <div>
                          <span>
                            {DiceText(area.element?.weapon?.damage ?? "")}
                          </span>
                          <span> </span>
                          <span>
                            {DiceText(area.element?.weapon?.critical ?? "")}
                          </span>
                          <TotAndBonus
                            show={false}
                            firstSign={true}
                            list={area.element?.toListMeleeDamage || []}
                          />
                        </div>
                      </div>
                    </Fragment>
                  )}
                {!area.element?.weaponRanged && (
                  <Fragment>
                    <div>
                      <span>{"melee2w: "}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "8px",
                        backgroundColor: "DarkRed"
                      }}
                    >
                      {area.element?.listBabMeleeTwoWeaponSpecificBonus &&
                        area.element?.listBabMeleeTwoWeaponSpecificBonus.map(
                          (n, index) => {
                            return (
                              <div key={index}>
                                <Popup bonusList={n} />
                              </div>
                            );
                          }
                        )}
                      <div>
                        <span>
                          {DiceText(area.element?.weapon?.damage ?? "")}
                        </span>
                        <span> </span>
                        <span>
                          {DiceText(area.element?.weapon?.critical ?? "")}
                        </span>

                        <TotAndBonus
                          show={false}
                          firstSign={true}
                          list={area.element?.toListRangedDamage || []}
                        />
                      </div>
                    </div>
                  </Fragment>
                )}
                {(area.element?.weaponRanged || area.element?.weaponThrown) && (
                  <Fragment>
                    <div>
                      <span>{"rnged2w: "}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "8px",
                        backgroundColor: "DarkSlateGrey"
                      }}
                    >
                      {area.element?.listBabRangedTwoWeaponSpecificBonus &&
                        area.element?.listBabRangedTwoWeaponSpecificBonus.map(
                          (n, index) => {
                            return (
                              <div key={index}>
                                <Popup bonusList={n} />
                              </div>
                            );
                          }
                        )}
                      <div>
                        <span>
                          {DiceText(area.element?.weapon?.damage ?? "")}
                        </span>
                        <span> </span>
                        <span>
                          {DiceText(area.element?.weapon?.critical ?? "")}
                        </span>
                        <TotAndBonus
                          show={false}
                          firstSign={true}
                          list={area.element?.toListRangedDamage || []}
                        />
                      </div>
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          );
        } 
        // else {
        //   return <div key={index} style={{ border: "1px solid red" }} />;
        // }
      })}
    </div>
  );
};
