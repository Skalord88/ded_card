import { Fragment } from "react/jsx-runtime";
import { BonusAbilities, signAndCountToString, SignNumber } from "../functions";
import { Popup } from "../Popup/Popup";
import { ModifierEnum } from "../Prerequisite/interface/ModifierEnum";
import { signAndCountString } from "../Sign/Function";
import { Speed } from "../Speed/interface";
import { countTotalHitPoints } from "../Vita/Functions";
import { createTotAndBonusElement } from "./functions/CreateTotAndBonusElement";
import {
  attacksMapElement,
  attacksPositionElement,
  ModifiedCharacter,
  WeaponElement
} from "./interface/ModifiedCharacter";

export type SummaryCharProps = {
  modCharacter: ModifiedCharacter;
};

export const SummaryChar: React.FC<SummaryCharProps> = ({ modCharacter }) => {
  return (
    <div className="rpgui-container-framed golden">
      <h2>{modCharacter.title}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
          gap: "10px",
          alignItems: "start"
        }}
      >
        <div>
          <p style={{ margin: 0 }}>Size/Type:</p>
        </div>
        <div>
          <p style={{ margin: 0 }}>
            {modCharacter.race?.size.size}{" "}
            {modCharacter.race?.race.raceType.raceClass.className}
          </p>
        </div>

        <div>
          <p>Hit Dice:</p>
        </div>
        <SummaryCharVita modCharacter={modCharacter} />

        <div>
          <p>Initiative:</p>
        </div>
        <div>
          <p>
            {signAndCountString([BonusAbilities(modCharacter.abilitys, "DEX")])}
          </p>
        </div>

        <SummaryCharSpeed modCharacter={modCharacter} />
        <SummaryCharArmorClass modCharacter={modCharacter} />
        <SummaryCharBaseAttack modCharacter={modCharacter} />
        <SummaryCharAttacks modCharacter={modCharacter} />
      </div>
    </div>
  );
};

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
  // const toListBab: TotAndBonusElement[] = modCharacter.attacks?.toListBab || [];

  const meleeAttackList: TotAndBonusElement[] = [
    // ...toListBab,
    ...(modCharacter.attacks?.firstMelee?.toListMeleeAttack || [])
  ];

  const meleeDamageList: TotAndBonusElement[] =
    modCharacter.attacks?.firstMelee?.toListMeleeDamage || [];

  const rangedAttackList: TotAndBonusElement[] = [
    // ...toListBab,
    ...(modCharacter.attacks?.firstRanged?.toListRangedAttack || [])
  ];

  const rangedDamageList: TotAndBonusElement[] = [
    ...(modCharacter.attacks?.firstRanged?.toListRangedDamage || [])
  ];
  const bab = signAndCountToString([modCharacter.attacks?.bab || 0]);
  const babMelee = signAndCountToString(
    [
      modCharacter.attacks?.bab || 0,
      modCharacter.attacks?.firstMelee?.babMelee || 0
    ],
    true
  );
  const babRanged = signAndCountToString(
    [
      modCharacter.attacks?.bab || 0,
      modCharacter.attacks?.firstRanged?.babRanged || 0
    ],
    true
  );
  return (
    <>
      <div>
        <p>Attack:</p>
      </div>
      <div>
        {/* Melee */}
        <SummaryCharAttacksTemplate>
          <div style={{ display: "flex", gap: "4px" }}>
            <span style={{ color: "orange" }}>{babMelee}</span>
            <span>{" : "}</span>
            <span>{bab}</span>
            <TotAndBonus show={false} firstSign={true} list={meleeAttackList} />
          </div>

          <div>
            <span>{modCharacter.attacks?.firstMelee?.weapon?.name}</span>
          </div>

          <div style={{ display: "flex", gap: "4px" }}>
            <span>{modCharacter.attacks?.firstMelee?.weapon?.damage}</span>

            <TotAndBonus show={false} firstSign={true} list={meleeDamageList} />
          </div>
        </SummaryCharAttacksTemplate>

        {/* Ranged */}
        {modCharacter.attacks?.firstRanged && (
          <SummaryCharAttacksTemplate>
            <div style={{ display: "flex", gap: "4px" }}>
              <span style={{ color: "orange" }}>{babRanged}</span>
              <span>{" : "}</span>
              <span>{bab}</span>
              <TotAndBonus
                show={false}
                firstSign={true}
                list={rangedAttackList}
              />
            </div>

            <div>
              <span>{modCharacter.attacks.firstRanged.weapon?.name}</span>
            </div>

            <div style={{ display: "flex", gap: "4px" }}>
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

const attacksMap = (bab: number): number[] => {
  const babFloor = Math.floor(bab);
  return [babFloor, babFloor - 5, babFloor - 10, babFloor - 15].filter(
    (value) => value > 0
  );
};

export const MapAllAttacks: React.FC<SummaryCharProps> = ({ modCharacter }) => {
  // console.log("modCharacter.attacks", modCharacter.attacks);
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
        gridTemplateRows: "repeat(4, auto)",
        gap: "4px",
        width: "100%"
      }}
    >
      {areas.map((area, index) => {
        if (area.show) {
          const babMelee = signAndCountToString([
            modCharacter.attacks?.bab || 0,
            area.element?.babMelee || 0
          ]);
          const babRanged = signAndCountToString([
            modCharacter.attacks?.bab || 0,
            area.element?.babRanged || 0
          ]);
          const mapOfAttacksMelee: number[] = attacksMap(
            modCharacter.attacks?.bab || 0
          ).map((bab) => bab + (area.element?.babMelee || 0));
          const mapOfAttacksRanged: number[] = attacksMap(
            modCharacter.attacks?.bab || 0
          ).map((bab) => bab + (area.element?.babRanged || 0));
          const positionBonus: TotAndBonusElement[] = attacksPositionElement(
            ["w1", "wA", "w21", "w2A"].find((a) => a === area.area)
              ? true
              : false,
            ((area.area === "w1" || area.area === "wA") &&
              areas[1].element?.babMelee) ||
              ((area.area === "w21" || area.area === "w2A") &&
                areas[3].element?.babMelee)
              ? true
              : false,
            false
          );

          return (
            <div key={index} style={{ border: "1px solid red" }}>
              <div>
                <p>
                  {area.area !== "empty" && " " + index + " "}
                  {area.element?.weapon?.name}
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
                {!area.element?.weaponRanged && (
                  <Fragment>
                    <div>
                      <span>{"melee: "}</span>
                    </div>
                    <div
                    // style={{ display: "flex", gap: "4px" }}
                    >
                      {mapOfAttacksMelee.map((bab, index) => (
                        <TotAndBonus
                          show={false}
                          firstSign={true}
                          list={[
                            ...positionBonus,
                            ...(area.element?.toListMeleeAttack || []),
                            attacksMapElement[index]
                          ]}
                        />
                      ))}
                    </div>
                  </Fragment>
                )}
                {(area.element?.weaponRanged || area.element?.weaponThrown) && (
                  <Fragment>
                    <div>
                      <span>{"ranged: "}</span>
                    </div>
                    <div style={{ display: "flex", gap: "4px" }}>
                      {mapOfAttacksRanged.map((bab, index) => (
                        <span key={index} style={{ color: "yellow" }}>
                          {signAndCountToString([bab], true)}
                        </span>
                      ))}
                    </div>
                  </Fragment>
                )}
                {!area.element?.weaponRanged && (
                  <Fragment>
                    <div>
                      <span>{"melee2w: "}</span>
                    </div>
                    <div style={{ display: "flex", gap: "4px" }}>
                      <TotAndBonus
                        show={false}
                        firstSign={true}
                        list={[
                          ...positionBonus,
                          ...(area.element?.toListMeleeTwoWeaponAttack || []),
                          attacksMapElement[index]
                        ]}
                      />
                      {/* {mapOfAttacksMelee.map((bab, index) => (
                        <span key={index} style={{ color: "yellow" }}>
                          {signAndCountToString([bab], true)}
                        </span>
                      ))} */}
                    </div>
                  </Fragment>
                )}
                {(area.element?.weaponRanged || area.element?.weaponThrown) && (
                  <Fragment>
                    <div>
                      <span>{"rnged2w: "}</span>
                    </div>
                    <div style={{ display: "flex", gap: "4px" }}>
                      {mapOfAttacksRanged.map((bab, index) => (
                        <span key={index} style={{ color: "yellow" }}>
                          {signAndCountToString([bab], true)}
                        </span>
                      ))}
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

export const fullAttackMap = (bab: number): number[] => {
  return [];
};

export const SummaryCharBaseAttack: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
  const toListGrapple: TotAndBonusElement[] = createTotAndBonusElement(
    modCharacter.attackRollMod || {},
    true,
    ["Grapple"]
  ).concat(modCharacter.attacks?.toListBab || []);

  return (
    <>
      <div>
        <p style={{ margin: 0 }}>Base Attack:</p>
      </div>
      <div>
        <TotAndBonus
          show={true}
          firstSign={true}
          list={modCharacter.attacks?.toListBab || []}
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
    <div>
      <span style={{ color: "orange" }}>
        {firstSign ? signAndCountToString([total]) : total}
      </span>

      <span>
        {" : ("}
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
    </div>
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
                  BonusAbilities(modCharacter.abilitys, "COS")
                )})`
            )
            .join(", ")}
      </p>
    </div>
  );
};
