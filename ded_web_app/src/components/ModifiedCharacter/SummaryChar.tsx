import { BonusAbilities } from "../functions";
import { Speed } from "../Speed/interface";
import { CountTotalHitPoints } from "../Vita/Functions";
import { ModifiedCharacter } from "./interface/ModifiedCharacter";

export type SummaryCharProps = {
  modCharacter: ModifiedCharacter;
};

export const SummaryChar: React.FC<SummaryCharProps> = ({ modCharacter }) => {
  return (
    <div className="rpgui-container-framed golden">
      <h2>{modCharacter.title}</h2>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <p>Size/Type:</p>
          <p>Hit Dice:</p>
          <p>Initiative:</p>
          <p>Speed:</p>
        </div>
        <div style={{ flex: 2 }}>
          <p>
            {modCharacter.race?.size.size}{" "}
            {modCharacter.race?.race.raceType.raceClass.className}
          </p>
          <SummaryCharVita modCharacter={modCharacter} />
          <p>+2</p>
          <SummaryCharSpeed modCharacter={modCharacter} />
        </div>
      </div>
    </div>
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
      {Object.entries(speed).map(([key, value]) => {
        if (value && value !== 0 && value !== "") {
          return (
            <span key={key}>
              {key} {value as number | string}
            </span>
          );
        }
        return null;
      })}
    </>
  );
};

export const SummaryCharVita: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
  const vita = modCharacter.listHitDices;
  return (
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
            ([dice, { first, lv }]) => `${lv}d${dice} (${CountTotalHitPoints(
              parseInt(dice), first, lv, BonusAbilities(modCharacter.abilitys, "COS"))})`
          )
          .join(", ")}
    </p>
  );
};
