import { Skill } from "../../Skills/interface/Skill";
import { SkillStudyTotAndBonusElement } from "../../Skills/interface/SkillStudyTotAndBonusElement";
import { Study } from "../../Skills/interface/Study";
import { createTotAndBonusElement } from "./CreateTotAndBonusElement";
import { BonusResultMap } from "./GetBonusResult";

export const createTotAndBonusElementWithSkill = (
    skillsFromDb: Skill[],
    studiesFromDb: Study[],
    sS: BonusResultMap,
    consoleLog?: boolean
  ): SkillStudyTotAndBonusElement[] => {

    const skillForStudiesMap: {[key: string]: Study[]} = {}

      studiesFromDb.forEach((st) =>{ 
        if(!skillForStudiesMap[st.skill.ability]){
          skillForStudiesMap[st.skill.ability] = []
        }
        skillForStudiesMap[st.skill.ability].push(st)
      })

    // if(consoleLog) console.log("skillForStudiesMap", skillForStudiesMap)

      const studiesInSkill: SkillStudyTotAndBonusElement[] =
  Object.values(skillForStudiesMap).map((studies) => ({
    skill: studies[0].skill,
    studies: studies.map((st) => ({
      study: st,
      list: createTotAndBonusElement(
        sS,
        true,
        [st.studyName.text || ""]
      )
    }))
  }));

  // if(consoleLog) console.log("studiesInSkill", studiesInSkill)

    const skillsTotAndBonus: SkillStudyTotAndBonusElement[] = skillsFromDb
      ? skillsFromDb.map((skill) => {
        
          const studyIndex = studiesInSkill.findIndex(
            (st) => st.skill.id === skill.id
          ); // returns -1 if not found
          // if(consoleLog) {console.log(studyIndex, skill)}
          if (studyIndex === -1) {
            return {
              skill: skill,
              list: createTotAndBonusElement(
                sS,
                true,
                [skill.skillName.text]
              )
            };
          } else {
            return studiesInSkill[studyIndex];
          }
        })
      : [];

      if(consoleLog) console.log("skillsTotAndBonus", skillsTotAndBonus)

    return skillsTotAndBonus;
    // return [];
  };

  

  // if(consoleLog) console.log("studiesInSkill", studiesInSkill)

    // const studiesInSkill: SkillStudyTotAndBonusElement[] = skillForStudies.map(
    //   (sk) => ({
    //     skill: sk,
    //     studies: studiesFromDb
    //       .filter((st) => st.skill === sk)
    //       .map((st) => ({
    //         study: st,
    //         list: createTotAndBonusElement(sS, true, [st.studyName.text || ""])
    //       }))
    //   })
    // );

    // if(consoleLog) console.log("studiesInSkill", studiesInSkill)