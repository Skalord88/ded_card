import { Popup } from "../../Popup/Popup";
import {
  ATTACK,
  EMPTY_BONUS,
  ModifierEnum,
  QUALITY
} from "../../Prerequisite/interface/ModifierEnum";
import { SpecialAbilities } from "../../Race/Interfaces";
import { SummaryCharProps } from "../SummaryChar";

export const SummaryCharSpecialAbilities: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
  // modCharacter.archetypes?.forEach((arch) => {
  //   console.log("special", arch.modifiers?.specialAbilities);
  // });
  const specialAttacks: SpecialAbilities[] | null =
    modCharacter.archetypes?.flatMap(
    (arch) =>
      arch.modifiers?.specialAbilities?.filter(
        (ab) => ab.attackQualities.text === "Attack"
      ) || []
  ) || [];
  const specialQualities: SpecialAbilities[] | null =
    modCharacter.archetypes?.flatMap(
    (arch) =>
      arch.modifiers?.specialAbilities?.filter(
        (ab) => ab.attackQualities.text === "Quality"
      ) || []
  ) || [];
  return (
    <>
      <div>
        <p>Special Attacks:</p>
      </div>
      <div>
        {specialAttacks.length === 0 ? (
          <div>
            <p>---</p>
          </div>
        ) : (
          specialAttacks.map((ab, index) => {
            const popText = {
              ...EMPTY_BONUS,
              description: ab.description,
              text: ab.name
            } as ModifierEnum;
            const text =
              index === specialAttacks.length - 1 ? ab.name : `${ab.name}, `;
            return <Popup key={index} text={text} popText={popText} />;
          })
        )}
      </div>
      <div>
        <p>Special Qualities:</p>
      </div>
      <div>
        {specialQualities.length === 0 ? (
          <div>
            <p>---</p>
          </div>
        ) : (
          specialQualities.map((ab, index) => {
            const popText = {
              ...EMPTY_BONUS,
              description: ab.description,
              text: ab.name
            } as ModifierEnum;
            const text =
              index === specialQualities.length - 1 ? ab.name : `${ab.name}, `;
            return <Popup key={index} text={text} popText={popText} />;
          })
        )}
      </div>
    </>
  );
};
