import { Fragment } from "react/jsx-runtime";
import { BonusAbilities, signAndCountToString, SignNumber } from "../functions";
import { createTotAndBonusElement } from "../ModifiedCharacter/functions/CreateTotAndBonusElement";
import {
  ModifiedCharacter,
  WeaponElement
} from "../ModifiedCharacter/interface/ModifiedCharacter";
import { Popup } from "../Popup/Popup";
import { ModifierEnum } from "../Prerequisite/interface/ModifierEnum";
import { signAndCountString } from "../Sign/Function";
import { Speed } from "../Speed/interface";
import { countTotalHitPoints } from "../Vita/Functions";
import { SummaryCharAttacks } from "./component/SummaryCharAttacks";
import { SummaryCharSaving } from "./component/SummaryCharSaving";
import { SummaryCharSpaceReach } from "./component/SummaryCharSpaceReach";
import { SummaryCharSpecialAbilities } from "./component/SummaryCharSpecialAbilities";
import { SummaryCharAbilities } from "./component/SummaryCharAbilities";
import { SummaryCharSkills } from "./component/SummaryCharSkills";
import { SummaryCharFeats } from "./component/SummaryCharFeats";

export type SummaryCharProps = {
  modCharacter: ModifiedCharacter;
};

export type SummaryCharDivTemplateProps = {
  children: React.ReactNode;
};

export const SummaryCharDivTemplate: React.FC<SummaryCharDivTemplateProps> = ({
  children
}) => {
  <div
    style={
      {
        // border: "1px solid red"
        //   display: "grid",
        //   gridTemplateColumns: "1fr 3fr"
      }
    }
  >
    {children}
  </div>;
};

export const SummaryChar: React.FC<SummaryCharProps> = ({ modCharacter }) => {
  return (
    <div className="rpgui-container-framed golden">
      <h2>{modCharacter.title}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr"
        }}
      >
        {/* <SummaryCharDivTemplate> */}
        <div>
          <p style={{ margin: 0 }}>Size/Type:</p>
        </div>
        <div>
          <p style={{ margin: 0 }}>
            {modCharacter.race?.size.size}{" "}
            {modCharacter.race?.race.raceType.raceClass.className}
          </p>
        </div>
        {/* </SummaryCharDivTemplate> */}

        <div>
          <p>Hit Dice:</p>
        </div>
        <SummaryCharVita modCharacter={modCharacter} />

        <div>
          <p>Initiative:</p>
        </div>
        <div>
          <p>
            {modCharacter.abilitys && signAndCountString([BonusAbilities(modCharacter.abilitys, "DEX")])}
          </p>
        </div>

        <SummaryCharSpeed modCharacter={modCharacter} />
        <SummaryCharArmorClass modCharacter={modCharacter} />
        <SummaryCharBaseAttack modCharacter={modCharacter} />
        <SummaryCharAttacks modCharacter={modCharacter} />
        <SummaryCharSpaceReach modCharacter={modCharacter} />
        <SummaryCharSpecialAbilities modCharacter={modCharacter} />
        <SummaryCharSaving modCharacter={modCharacter} />
        <SummaryCharAbilities modCharacter={modCharacter} />
        <SummaryCharSkills modCharacter={modCharacter} />
        <SummaryCharFeats modCharacter={modCharacter} />
      </div>
    </div>
  );
};

export const mapAllAttacksAreas = (
  elelments: (WeaponElement | undefined)[]
): { element: WeaponElement | undefined; area: string; show: boolean }[] => {
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

export const SummaryCharBaseAttack: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
  const toListGrapple: TotAndBonusElement[] = createTotAndBonusElement(
    modCharacter.attackRollMod || {},
    true,
    ["Grapple"]
  ).concat(modCharacter.attacks?.summedBab || []);

  return (
    <>
      <div>
        <p>Base Attack:</p>
      </div>
      <div>
        <TotAndBonus
          show={true}
          firstSign={true}
          list={modCharacter.attacks?.listBab || []}
        />
      </div>
      <div>
        <p>Grapple:</p>
      </div>
      <div>
        <TotAndBonus show={true} firstSign={true} list={toListGrapple} />
      </div>
    </>
  );
};

export type TotAndBonusElement = {
  bonus: number;
  text?: string;
  pop: ModifierEnum;
};

export type TotAndBonusProps = {
  show: boolean;
  firstSign?: boolean;
  list: TotAndBonusElement[];
  children?: React.ReactNode;
};

export const TotAndBonus: React.FC<TotAndBonusProps> = ({
  show,
  firstSign,
  list,
  children
}) => {
  const total: number = Math.floor(
    list.reduce((tot, element) => tot + (element?.bonus || 0), 0)
  );

  return (
    <span>
      <span style={{ color: "orange" }}>
        {firstSign ? signAndCountToString([total]) : total}
      </span>

      <span>
        {":("}
        {list.length !== 0 &&
          list.map((l: TotAndBonusElement, index) => {
            const sign: string = signAndCountToString([l?.bonus || 0]);
            const text = show && l.text ? [sign, l.text] : [sign];

            return (
              <Fragment key={index}>
                <Popup text={text} popText={l?.pop || ""} />
                {index === list.length - 1 ? null : show ? (
                  <span>{", "}</span>
                ) : (
                  <span> </span>
                )}
              </Fragment>
            );
          })}
        {")"}
      </span>

      {children}
    </span>
  );
};

export type TotAndBonusAllProps = {
  totBab: number;
  bab: number;
  children?: React.ReactNode;
};

export const TotAndBonusAll: React.FC<TotAndBonusAllProps> = ({
  totBab,
  bab,
  children
}) => {
  const total: string = signAndCountToString([totBab], true);
  const bonus: string = signAndCountToString([bab], true);
  return (
    <>
      <span style={{ color: "orange" }}>{total}</span>
      <span>{" : "}</span>
      <span style={{ textShadow: "2px 2px 5px orange" }}>{bonus}</span>
      {children}
    </>
  );
};

export const ListOfAllModifiers: React.FC<{
  total: number;
  modChar: ModifiedCharacter;
}> = ({ total, modChar }) => {
  // console.log("modifiers", modifiers);

  const toList: TotAndBonusElement[] = createTotAndBonusElement(
    modChar.attackRollMod ?? {},
    true,
    ["Grapple"]
  );
  // .filter((e) => e.pop === key)

  return (
    <>
      <span>{SignNumber(total)}</span>
      <span>{total}</span>
      <TotAndBonus show={true} list={toList} />
    </>
  );
};

export const SummaryCharArmorClass: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
  return (
    <>
      <div>
        <p>Armor Class:</p>
      </div>
      <TotAndBonus show={true} list={modCharacter.toListArmorClass || []} />
    </>
  );
};

export const SummaryCharSpeed: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
  const speed: Speed = {
    foot:
      ((modCharacter.race?.modifiers?.speed?.foot as number) || 0) +
      ((modCharacter.race?.race.modifiers?.speed?.foot as number) || 0) +
      (modCharacter.archetypes?.reduce((acc, archetype) => {
        return acc + ((archetype.modifiers?.speed?.foot as number) || 0);
      }, 0) || 0),
    fly:
      ((modCharacter.race?.modifiers?.speed?.fly as number) || 0) +
      ((modCharacter.race?.race.modifiers?.speed?.fly as number) || 0) +
      (modCharacter.archetypes?.reduce((acc, archetype) => {
        return acc + ((archetype.modifiers?.speed?.fly as number) || 0);
      }, 0) || 0),
    swim:
      ((modCharacter.race?.modifiers?.speed?.swim as number) || 0) +
      ((modCharacter.race?.race.modifiers?.speed?.swim as number) || 0) +
      (modCharacter.archetypes?.reduce((acc, archetype) => {
        return acc + ((archetype.modifiers?.speed?.swim as number) || 0);
      }, 0) || 0),
    climb:
      ((modCharacter.race?.modifiers?.speed?.climb as number) || 0) +
      ((modCharacter.race?.race.modifiers?.speed?.climb as number) || 0) +
      (modCharacter.archetypes?.reduce((acc, archetype) => {
        return acc + ((archetype.modifiers?.speed?.climb as number) || 0);
      }, 0) || 0),
    special: ""
  };

  return (
    <>
      <div>
        <p>Speed:</p>
      </div>
      <div>
        {Object.entries(speed).map(([key, value]) => {
          if (value && value !== 0 && value !== "") {
            return (
              <p key={key}>
                {key} {value as number | string}
              </p>
            );
          }
          return null;
        })}
      </div>
    </>
  );
};

export const SummaryCharVita: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
  const vita = modCharacter.listHitDices;
  return (
    <div>
      <p>
        {vita &&
          Object.entries(vita)
            // metti come prima il [dice] dove first e' vero
            .sort(([diceA, { first: firstA }], [diceB, { first: firstB }]) => {
              if (firstA && !firstB) {
                return -1;
              } else if (!firstA && firstB) {
                return 1;
              } else {
                return 0;
              }
            })
            .map(
              ([dice, { first, lv }]) =>
                `${lv}d${dice} (${countTotalHitPoints(
                  parseInt(dice),
                  first,
                  lv,
                  modCharacter.abilitys ? BonusAbilities(modCharacter.abilitys, "COS") : 0
                )})`
            )
            .join(", ")}
      </p>
    </div>
  );
};
