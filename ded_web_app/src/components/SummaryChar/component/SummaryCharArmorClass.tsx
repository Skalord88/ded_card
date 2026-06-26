import { SummaryCharProps } from "../SummaryChar";
import { TotAndBonus } from "./TotAndBonus";

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