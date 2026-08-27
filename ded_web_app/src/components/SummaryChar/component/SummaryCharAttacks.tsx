import { Fragment } from "react/jsx-runtime";
import { DiceText } from "../../Dice/Functions";
import { Weapon } from "../../interfaces";
import { WeaponElement } from "../../ModifiedCharacter/interface/ModifiedCharacter";
import { Popup } from "../../Popup/Popup";
import { noneWeapon } from "../../variables";
import { SummaryCharProps } from "../SummaryChar";
import { TotAndBonus, TotAndBonusElement } from "./TotAndBonus";
import {
  AttackOptionsElement,
  createBorder,
  getAttackColor
} from "../../../pages/Fight";
import { useState } from "react";

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
          totAndBonusAtt={[false, true, true, false]}
          listBab={elementMelee.element?.listBabMeleeSpecificBonus || []}
          weapon={elementMelee.element?.weapon || noneWeapon}
          damage={elementMelee.element?.toListMeleeDamage || []}
          // element={elementMelee}
          totAndBonusDmg={[false, true, false]}
        />
        {(modCharacter.attacks?.firstRanged?.weaponRanged ||
          modCharacter.attacks?.firstRanged?.weaponThrown) && (
          <SummaryCharAttacksSingleElement
            totAndBonusAtt={[false, true, true, false]}
            listBab={elementRanged.element?.listBabRangedSpecificBonus || []}
            weapon={elementRanged.element?.weapon || noneWeapon}
            damage={elementRanged.element?.toListRangedDamage || []}
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
  totAndBonusAtt: [boolean, boolean, boolean, boolean]; //show, firstSign, firstOnList, onlyTot
  listBab: TotAndBonusElement[][];
  weapon: Weapon;
  damage: number | TotAndBonusElement[];
  totAndBonusDmg: [boolean, boolean, boolean];
};
export const SummaryCharAttacksSingleElement: React.FC<
  SummaryCharAttacksSingleElementProps
> = ({ border, totAndBonusAtt, listBab, weapon, damage, totAndBonusDmg }) => {
  const attValue = listBab;
  const dmgValue = damage;
  const [show, firstSign, firstOnList, onlyTot] = totAndBonusAtt;
  return (
    <SummaryCharAttacksTemplate borderText={border}>
      {firstOnList
        ? attValue.length > 0 && (
            <TotAndBonus
              show={show}
              firstSign={firstSign}
              list={attValue[0]}
              onlyTot={onlyTot}
            />
          )
        : attValue.map((a, i) => (
            <TotAndBonus
              key={i}
              show={show}
              firstSign={firstSign}
              list={a}
              onlyTot={onlyTot}
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
): {
  element: WeaponElement | undefined;
  area: string;
  show: boolean;
  selected?: boolean;
}[] => {
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
    }
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
        if (area.show && area.element?.weapon) {
          const listBabBonus = [
            area.element?.listBabMeleeSpecificBonus,
            area.element?.listBabRangedSpecificBonus,
            area.element?.listBabMeleeTwoWeaponSpecificBonus,
            area.element?.listBabRangedTwoWeaponSpecificBonus
          ].filter((a) => a !== undefined);
          const listDamage = [
            area.element?.toListMeleeDamage,
            area.element?.toListRangedDamage,
            area.element?.toListMeleeTwoWeaponDamage,
            area.element?.toListRangedTwoWeaponDamage
          ].filter((a) => a !== undefined);
          // console.log("listDamage", listDamage)
          return (
            <div key={index} style={{ border: "1px solid red" }}>
              <div>
                <p>{area.element?.weapon?.name}</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
                {Array.from({ length: listBabBonus.length }).map(
                  (_, indexA) => {
                    return (
                      <>
                        {area.element?.weapon && (
                          // listBabBonus[indexA] &&
                          // listDamage[indexA] &&
                          <MapAllAttacksElements
                            index={indexA}
                            clicked={true}
                            ranged={area.element?.weaponRanged || false}
                            thrown={area.element?.weaponThrown || false}
                            weaponDamage={area.element?.weapon.damage}
                            weaponCritical={area.element?.weapon.critical}
                            listBabBonusI={listBabBonus}
                            listDamageI={listDamage}
                          />
                        )}
                      </>
                    );
                  }
                )}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export type MapAllAttacksElementsProps = {
  index: number;
  clicked: boolean;
  
  ranged: boolean;
  thrown: boolean;
  weaponDamage: string;
  weaponCritical: string;
  listBabBonusI?: TotAndBonusElement[][][];
  listBabBonusII?: TotAndBonusElement[][];
  listDamageI?: TotAndBonusElement[][];
  listDamageII?: TotAndBonusElement[];
};

export const titleMapAllAttacksElements = (
  thrown: boolean,
  ranged: boolean
): string[] => {
  if (thrown) return ["melee", "ranged", "melee2H", "ranged2H"];
  if (!ranged) {
    return ["melee", "melee2H"];
  } else {
    return ["ranged", "ranged2H"];
  }
};
export const backgroundColorMapAllAttacksElements = [
  "Brown",
  "CornflowerBlue",
  "DarkRed",
  "DarkSlateGrey"
];

export const MapAllAttacksElements: React.FC<MapAllAttacksElementsProps> = ({
  index,
  clicked,
  ranged,
  thrown,
  weaponDamage,
  weaponCritical,
  listBabBonusI,
  listBabBonusII,
  listDamageI,
  listDamageII
}) => {
  const border: string = createBorder(clicked);

  const attackColor = getAttackColor(ranged);

  const finalBorder = `${border} ${attackColor}`;

  const title: string[] = titleMapAllAttacksElements(thrown, ranged);

  // const actualBabList = showBabListByIndex(listBabBonus, hasOffHand)
  return (
    <>
      <div>
        <p>{title[index]}</p>
      </div>
      <div
        className={finalBorder}
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "8px"
        }}
      >
        {listBabBonusI &&
          listBabBonusI[index].map((n, i) => {
            return (
              <div key={i}>
                <Popup bonusList={n} />
              </div>
            );
          })}
          {listBabBonusII &&
            listBabBonusII.map((n, i) => {
              return(
                <div key={i}>
                  <Popup bonusList={n}/>
                </div>
              )
            })
          }
        <div>
          <span>{DiceText(weaponDamage)}</span>
          <span> </span>
          <span>{DiceText(weaponCritical)}</span>
          {listDamageI &&
          <TotAndBonus show={false} firstSign={true} list={listDamageI[index]} />}
          {listDamageII &&
          <TotAndBonus show={false} firstSign={true} list={listDamageII} />}
        </div>
      </div>
    </>
  );
};
