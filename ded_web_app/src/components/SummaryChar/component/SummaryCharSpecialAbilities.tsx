import { Popup } from "../../Popup/Popup";
import { EMPTY_BONUS, ModifierEnum } from "../../Prerequisite/interface/ModifierEnum";
import { SpecialAbilities } from "../../Race/Interfaces";
import { SummaryCharProps } from "../SummaryChar";

export const SummaryCharSpecialAbilities: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
  const specialAbilities: SpecialAbilities[] | null =
    modCharacter.archetypes?.flatMap(
      (arch) => arch.modifiers?.specialAbilities || []
    ) || [];
  return (
    <>
      <div>
        <p>Special Attacks:</p>
      </div>
      <div>
        {specialAbilities.length === 0 ? (
          <div>
            <p>---</p>
          </div>
        ) : (
          specialAbilities.map((ab, index) => {
            const popText = {
              ...EMPTY_BONUS,
              description: ab.description,
              text: ab.name
            } as ModifierEnum;
            const text =
              index === specialAbilities.length - 1 ? ab.name : `${ab.name}, `;
            return <Popup key={index} text={text} popText={popText} />;
          })
        )}
      </div>
    </>
  );
};
