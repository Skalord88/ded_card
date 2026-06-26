import { createTotAndBonusElement } from "../../ModifiedCharacter/functions/CreateTotAndBonusElement";
import { SummaryCharProps } from "../SummaryChar";
import { TotAndBonus } from "./TotAndBonus";

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
          <div>
            <p>fortitude</p>
          </div>
          <TotAndBonus
            show={true}
            firstSign={true}
            list={modCharacter.fortitude || []}
          />
        </div>
        <div>
          <div>
            <p>reflex</p>
          </div>
          <TotAndBonus
            show={true}
            firstSign={true}
            list={modCharacter.reflex || []}
          />
        </div>
        <div>
          <div>
            <p>will</p>
          </div>
          <TotAndBonus
            show={true}
            firstSign={true}
            list={modCharacter.will || []}
          />
        </div>
      </div>
    </>
  );
};
