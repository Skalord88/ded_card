import { createTotAndBonusElement } from "../../ModifiedCharacter/functions/CreateTotAndBonusElement";
import { SummaryCharProps, TotAndBonus } from "../SummaryChar";

export const SummaryCharSaving: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {

  return (
    <>
      <div>
        <p>Saves:</p>
      </div>
      <div>
        <div>
          <TotAndBonus show={true} firstSign={true} list={modCharacter.fortitude || []} />
        </div>
        <div>
          <TotAndBonus show={true} firstSign={true} list={modCharacter.reflex || []} />
        </div>
        <div>
          <TotAndBonus show={true} firstSign={true} list={modCharacter.will || []} />
        </div>
      </div>
    </>
  );
};
