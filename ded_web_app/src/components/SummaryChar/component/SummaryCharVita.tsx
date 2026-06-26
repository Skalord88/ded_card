import { BonusAbilities } from "../../functions";
import { countTotalHitPoints } from "../../Vita/Functions";
import { SummaryCharProps } from "../SummaryChar";

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