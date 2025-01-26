import { useEffect, useState } from "react";
import { AbilitysSummaryComponent } from "../AbilitysComponent";
import { CharacterPc } from "../interfaces";
import { createModChar } from "../Prerequisite/functions/modChar";
import { CharToModify } from "../Prerequisite/functions/modifyCharacter";
import { SubRace } from "../Race/Interfaces";
import { SkillSummaryComponent } from "../Skills/Show/SkillShowComponent";
import { SpecialAbilitiesSummaryComponent } from "../SpecialAbilities/SpecialAbilitiesComponent";
import { SpeedSummaryComponent } from "../SpeedComponent";
import { ClassPc } from "../ClassPc/Interface/ClassPcLevel";

export interface SummaryProps {
  character: CharacterPc;
  race?: SubRace;
  classPcList?: ClassPc[]
}

export const CharSummary: React.FC<SummaryProps> = ({ character, race, classPcList }) => {
  const [updateChar, setUpChar] = useState<CharToModify>();

  useEffect(() => {
    const char: CharacterPc = {
      ...character,
      race: race? race : character.race,
      classPcList: classPcList? classPcList : character.classPcList
    }
    const newChar: CharToModify = createModChar(char)
     setUpChar(newChar)
  },[character, race, classPcList])

  return (
    <>
      {updateChar ? (
        <div className="rpgui-container-framed-grey">
          <AbilitysSummaryComponent abilitys={updateChar.abilitys} />
          <SkillSummaryComponent char={updateChar} />
          <SpeedSummaryComponent char={updateChar} />
          <SpecialAbilitiesSummaryComponent char={updateChar} />
        </div>
      ) : (
        <p>...loading...</p>
      )}
    </>
  );
};
