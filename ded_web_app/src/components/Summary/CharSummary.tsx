import { useEffect, useState } from "react";
import { AbilitysSummaryComponent } from "../AbilitysComponent";
import { CharacterPc, Inventory } from "../interfaces";
import { createModChar } from "../Prerequisite/functions/modChar";
import { CharToModify, FeatsFromChar } from "../Prerequisite/functions/modifyCharacter";
import { SubRace } from "../Race/Interfaces";
import { SkillSummaryComponent } from "../Skills/Show/SkillShowComponent";
import { SpecialAbilitiesSummaryComponent } from "../SpecialAbilities/SpecialAbilitiesComponent";
import { SpeedSummaryComponent } from "../SpeedComponent";
import { ClassPc } from "../ClassPc/Interface/ClassPcLevel";
import { HpSummaryComponent } from "../HpComponent";
import { BaseSummaryAttack } from "../Attack/BaseAttack/BaseAttack";
import { SavingSummaryThrowComponent } from "../SavingThrowComponent";
import { Feat, FeatPc } from "../Feats/Interface/FeatInterface";
import { FormattingText } from "../Formatting/Function";

export interface SummaryProps {
  character: CharacterPc;
  race?: SubRace;
  classPcList?: ClassPc[];
  feats?: FeatPc[]
  inventory?: Inventory;
}

export const CharSummary: React.FC<SummaryProps> = ({
  character,
  race,
  classPcList,
  feats,
  inventory
}) => {
  const [updateChar, setUpChar] = useState<CharToModify | null>(null);
  const [textClass, setTextClass] = useState<string>();

  useEffect(() => {
    const char: CharacterPc = {
      ...character,
      race: race ? race : character.race,
      classPcList: classPcList ? classPcList : character.classPcList,
      featsList: feats? feats : character.featsList,
      inventory: inventory? inventory : character.inventory,

    };
    const newChar: CharToModify = createModChar(char);

    const newTextList: string[] = classPcList
      ? classPcList.flatMap(
          (cl: ClassPc) => "lv." + cl.level + ": " + FormattingText(cl.classCharacter.className)
        )
      : character.classPcList.flatMap(
          (cl: ClassPc) => "lv." + cl.level + ": " + FormattingText(cl.classCharacter.className)
        );
    setTextClass(newTextList.join(", "));

    setUpChar(newChar);
  }, [character, race, classPcList]);

  return (
    <>
      {updateChar ? (
        <div className="rpgui-container-framed-grey">
          <h3>{character.race ? character.race.subRacesName : null}</h3>
          <AbilitysSummaryComponent abilitys={updateChar.abilitys} />
          {textClass ? <p>{textClass}</p> : null}
          <SkillSummaryComponent char={updateChar} />
          <SpeedSummaryComponent char={updateChar} />
          <SpecialAbilitiesSummaryComponent char={updateChar} />
          <HpSummaryComponent char={updateChar} />
          <BaseSummaryAttack char={updateChar} />
          <SavingSummaryThrowComponent char={updateChar} />
        </div>
      ) : (
        <p>...loading...</p>
      )}
    </>
  );
};
