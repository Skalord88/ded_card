import { createTotAndBonusElement } from "../../ModifiedCharacter/functions/CreateTotAndBonusElement";
import { SummaryCharProps } from "../SummaryChar";
import { TotAndBonusElement, TotAndBonus } from "./TotAndBonus";

export const SummaryCharBaseAttack: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
  const toListGrapple: TotAndBonusElement[] = createTotAndBonusElement(
    modCharacter.attackRollMod || {},
    true,
    ["Grapple"]
  )

//   console.log(
//   "GRAPPLE MAP",
//   JSON.stringify(modCharacter.attackRollMod, null, 2)
// );

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