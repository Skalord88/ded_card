import { BonusAbilities, signAndCountString, SignNumber } from "../functions";
import { Popup } from "../Popup/Popup";
import { Speed } from "../Speed/interface";
import { countTotalHitPoints } from "../Vita/Functions";
import { generalBonus } from "./functions/GeneralBonus";
import { specificTargetBonus } from "./functions/SpecificTargetBonus";
import {
  AllModifiers,
  ModifiedCharacter,
  ModifierResult,
  ModifierTarget
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
        }}
      >
        <div>
          <p>Size/Type:</p>
        </div>
        <div>
          <p>
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
      </div>
    </div>
  );
};

export const SummaryCharBaseAttack: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
  const bab: number = Math.floor(modCharacter.bab);
  const grapple: number =
    bab +
    generalBonus(modCharacter.attackRollMod || {}) +
    specificTargetBonus("Grapple", modCharacter.attackRollMod || {});
  return (
    <>
      <div>
        <p>Base Attack/Grapple:</p>
      </div>
      <div>
        <p>
          {SignNumber(bab)}
          {bab} / {SignNumber(grapple)}
          {grapple}
        </p>
      </div>
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
      <div>
        {modCharacter.armorClassMod &&
          Object.entries(modCharacter.armorClassMod).map(
            ([key, value], index) => (
              <span key={key + "." + index}>
                <Popup
                  key={key}
                  text={
                    key +
                    " " +
                    SignNumber((value as ModifierResult).bonus) +
                    (value as ModifierResult).bonus
                  }
                  popText={
                    (value as ModifierResult).sources
                      ?.map((s) => s.text)
                      .join(", ") || ""
                  }
                />
                <span>
                  {index ===
                  Object.entries(modCharacter.armorClassMod || []).length - 1
                    ? ""
                    : ", "}
                </span>
              </span>
            )
          )}
      </div>
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
