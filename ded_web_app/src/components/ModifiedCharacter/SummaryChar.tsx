import { Fragment } from "react/jsx-runtime";
import { BonusAbilities, signAndCountToString, SignNumber } from "../functions";
import { Popup } from "../Popup/Popup";
import { ModifierEnum } from "../Prerequisite/interface/ModifierEnum";
import { signAndCountString } from "../Sign/Function";
import { Speed } from "../Speed/interface";
import { countTotalHitPoints } from "../Vita/Functions";
import { createTotAndBonusElement } from "./functions/CreateTotAndBonusElement";
import {
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
          gridTemplateColumns: "1fr 2fr",
          gap: "10px"
          ,
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

export const SummaryCharAttacks: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
  return (
    <>
      <div>
        <p>Attack:</p>
      </div>
      <div>
        <p>
          <span style={{ color: "yellow" }}>
            {signAndCountString([modCharacter.attacks?.bab || 0])}
          </span>
          {modCharacter.attacks?.firstMelee && (
            <span>{modCharacter.attacks?.firstMelee?.weaponMelee?.name}</span>
          )}
          <span>{modCharacter.attacks?.firstMelee?.damageMelee}</span>
          {" / "}
          <span style={{ color: "yellow" }}>
            {modCharacter.attacks?.babMelee &&
              signAndCountString([modCharacter.attacks?.babMelee])}
          </span>
          {modCharacter.attacks?.firstRanged && (
            <span>{modCharacter.attacks?.firstRanged?.weaponRanged?.name}</span>
          )}
          {modCharacter.attacks?.firstRanged && (
            <span>{modCharacter.attacks?.firstRanged?.damageRanged}</span>
          )}
        </p>
      </div>
      <div>
        <p>Full Attack:</p>
      </div>
      <MapAllAttacks
        modCharacter={modCharacter}
        // babMelee={babMelee}
        // babRanged={babRanged}
        // list={listAllAttacks}
      />
    </>
  );
};

export const mapAllAttacksAreas = (
  elelments: (WeaponElement | undefined)[]
): { element: WeaponElement | undefined; area: string }[] => {
  return [
    { element: elelments[0], area: "w1" },
    { element: elelments[1], area: "w2" },
    { element: elelments[2], area: "wA" },
    { element: {}, area: "empty" },
    { element: elelments[3], area: "w21" },
    { element: elelments[4], area: "w22" },
    { element: elelments[5], area: "w2A" },
    { element: {}, area: "empty" }
  ];
};

export const MapAllAttacks: React.FC<SummaryCharProps> = ({ modCharacter }) => {
  const areas = mapAllAttacksAreas([
    modCharacter.attacks?.firstAttackSetOne || undefined,
    modCharacter.attacks?.firstAttackSetTwo || undefined,
    modCharacter.attacks?.additionalAttackSetOne || undefined,
    modCharacter.attacks?.secondAttackSetOne || undefined,
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
        gap: "8px",
        width: "100%"
      }}
    >
      {areas.map((area, index) => {
        return (
          <div key={index} style={{ border: "1px solid red" }}>
            <div>
              <p>
                {area.area !== "empty" && " " + index + " "}
                {area.element?.weaponRanged
                  ? area.element.weaponRanged.name
                  : area.element?.weaponMelee?.name}
              </p>
            </div>
            <TotAndBonus
              show={false}
              list={
                area.element?.toListMeleeAttack
                  ? area.element.toListMeleeAttack
                  : area.element?.toListRangedAttack || []
              }
            />
          </div>
        );
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
        <TotAndBonus show={true} list={modCharacter.attacks?.toListBab || []} />
      </div>
      <div>
        <p>Grapple:</p>
      </div>
      <div>
        <TotAndBonus show={true} list={toListGrapple} />
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
  list: TotAndBonusElement[];
  children?: React.ReactNode;
};

export const TotAndBonus: React.FC<TotAndBonusProps> = ({
  show,
  list,
  children
}) => {
  const total: number = Math.floor(
    list.reduce((tot, element) => (tot += element.bonus), 0)
  );

  return (
    <div>
      <span style={{ color: "orange" }}>{total}</span>

      <span>
        {" : ("}
        {list.length !== 0 &&
          list.map((l: TotAndBonusElement, index) => {
            const sign: string = signAndCountToString([l.bonus]);
            const text = show && l.text ? [sign, l.text] : [sign];

            return (
              <Fragment key={index}>
                <Popup text={text} popText={l.pop} />
                {index === list.length - 1 ? null : <span> </span>}
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
      {/* {mods.map((m) => (
        <Popup text={signAndCountString([m.bonus])} popText={m.key} />
      ))}
      <span>
        {" / "}
        {babAndGrapple}
      </span>
      {mods.map((m) => (
        <Popup text={signAndCountString([m.bonus])} popText={m.key} />
      ))}
      {modsGrapple.map((m) => (
        <Popup text={signAndCountString([m.bonus])} popText={m.key} />
      ))} */}
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
