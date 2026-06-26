import { Fragment } from "react/jsx-runtime";
import { WeaponElement } from "../../ModifiedCharacter/interface/ModifiedCharacter";
import { Popup } from "../../Popup/Popup";
import {
  SummaryCharProps  
} from "../SummaryChar";
import { TotAndBonusElement, TotAndBonus } from "./TotAndBonus";

export type SummaryCharAttacksTemplateProps = {
  children: React.ReactNode;
};

export const SummaryCharAttacksTemplate: React.FC<
  SummaryCharAttacksTemplateProps
> = ({ children }) => {
  return (
    <div
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
  const meleeAttackList: TotAndBonusElement[] = [
    ...(modCharacter.attacks?.firstMelee.listBabMeleeSpecificBonus?.[0] || [])
  ];

  const meleeDamageList: TotAndBonusElement[] =
    modCharacter.attacks?.firstMelee?.toListMeleeDamage || [];

  const rangedAttackList: TotAndBonusElement[] = [
    ...(modCharacter.attacks?.firstRanged?.listBabRangedSpecificBonus?.[0] ||
      [])
  ];

  const rangedDamageList: TotAndBonusElement[] = [
    ...(modCharacter.attacks?.firstRanged?.toListRangedDamage || [])
  ];
  return (
    <>
      <div>
        <p>Attack:</p>
      </div>
      <div>
        {/* Melee */}
        <SummaryCharAttacksTemplate>
          <TotAndBonus show={false} firstSign={true} list={meleeAttackList} />

          <div>
            <span>{modCharacter.attacks?.firstMelee?.weapon?.name}</span>
          </div>

          <div>
            <span>{modCharacter.attacks?.firstMelee?.weapon?.damage}</span>

            <TotAndBonus show={false} firstSign={true} list={meleeDamageList} />
          </div>
        </SummaryCharAttacksTemplate>

        {/* Ranged */}
        {modCharacter.attacks?.firstRanged && (
          <SummaryCharAttacksTemplate>
            <div>
              <TotAndBonus
                show={false}
                firstSign={true}
                list={rangedAttackList}
              />
            </div>

            <div>
              <span>{modCharacter.attacks.firstRanged.weapon?.name}</span>
            </div>

            <div>
              <span>{modCharacter.attacks?.firstRanged?.weapon?.damage}</span>

              <TotAndBonus
                show={false}
                firstSign={true}
                list={rangedDamageList}
              />
            </div>
          </SummaryCharAttacksTemplate>
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

export const mapAllAttacksAreas = (
  elelments: (WeaponElement | undefined)[]
): { element: WeaponElement | undefined; area: string; show: boolean }[] => {
  // console.log("elelments[2]?.weaponLight", elelments[2]?.weapon?.name, elelments[2]?.weaponLight)
  // console.log("elelments[5]?.weaponLight", elelments[5]?.weapon?.name, elelments[5]?.weaponLight)
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
    { element: {}, area: "empty", show: false },
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
    { element: {}, area: "empty", show: false }
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
        gridTemplateAreas: `
      "w1 w2"
      "wA empty"
      "w21 w22"
      "w2A empty"
    `,
        gridTemplateColumns: "1fr 1fr",
        gap: "4px"
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
                        <span>{area.element?.weapon?.damage}</span>
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
                          <span>{area.element?.weapon?.damage}</span>
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
                        <span>{area.element?.weapon?.damage}</span>

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
                        <span>{area.element?.weapon?.damage}</span>
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
        } else {
          return <div key={index} style={{ border: "1px solid red" }} />;
        }
      })}
    </div>
  );
};