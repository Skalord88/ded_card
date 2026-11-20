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

  const skillForStudiesMap: { [key: number]: Study[] } = {};

  // Raggruppa gli studies per skill.id
  studiesFromDb.forEach((st) => {
    const skillId = st.skill.id;

    if (!skillForStudiesMap[skillId]) {
      skillForStudiesMap[skillId] = [];
    }

    skillForStudiesMap[skillId].push(st);
  });

  // Crea la struttura Skill + Studies
  const studiesInSkill: SkillStudyTotAndBonusElement[] =
    Object.values(skillForStudiesMap).map((studies) => ({
      skill: studies[0].skill,
      studies: studies.map((st) => ({
        study: st,
        list: createTotAndBonusElement(
          sS,
          true,
          [st.studyName.name || ""]
        )
      }))
    }));

  // Associa gli studies alle skills
  const skillsTotAndBonus: SkillStudyTotAndBonusElement[] =
    skillsFromDb.map((skill) => {

      const studyGroup = studiesInSkill.find(
        (st) => st.skill.id === skill.id
      );

      if (!studyGroup) {
        return {
          skill,
          list: createTotAndBonusElement(
            sS,
            true,
            [skill.skillName.name || ""]
          )
        };
      }

      return studyGroup;
    });

  if (consoleLog) {
    console.log("skillForStudiesMap", skillForStudiesMap);
    console.log("studiesInSkill", studiesInSkill);
    console.log("skillsTotAndBonus", skillsTotAndBonus);
  }

  return skillsTotAndBonus;
};


// (alias) type SkillStudyTotAndBonusElement = {
//  skill: Skill;
//  studies?: StudyTotAndBonusElement[];
//  list?: TotAndBonusElement[];
// }
// import SkillStudyTotAndBonusElement

// export const createTotAndBonusElementWithSkill = (
//   skillsFromDb: Skill[],
//   studiesFromDb: Study[],
//   sS: BonusResultMap,
//   consoleLog?: boolean
// ): SkillStudyTotAndBonusElement[] => {
//   // if(consoleLog) console.log("createTotAndBonusElementWithSkill", skillsFromDb, studiesFromDb, sS);
//   const skillForStudiesMap: { [key: string]: Study[] } = {};

//   studiesFromDb.forEach((st) => {
//     if (!skillForStudiesMap[st.skill.ability]) {
//       skillForStudiesMap[st.skill.ability] = [];
//     }
//     skillForStudiesMap[st.skill.ability].push(st);
//   });

//   // if(consoleLog) console.log("skillForStudiesMap", createTotAndBonusElement(sS, true, ["DEXTERITY"]));

//   const studiesInSkill: SkillStudyTotAndBonusElement[] = Object.values(
//     skillForStudiesMap
//   ).map((studies) => ({
//     skill: studies[0].skill,
//     studies: studies.map((st) => ({
//       study: st,
//       list: createTotAndBonusElement(sS, true, [st.studyName.name || ""])
//     }))
//   }));

//   // if(consoleLog) console.log("studiesInSkill", studiesInSkill)

//   const skillsTotAndBonus: SkillStudyTotAndBonusElement[] = skillsFromDb
//     ? skillsFromDb.map((skill) => {
//         const studyIndex = studiesInSkill.findIndex(
//           (st) => st.skill.id === skill.id
//         ); // returns -1 if not found
//         // if(consoleLog) {console.log(studyIndex, skill)}
//         if (studyIndex === -1) {
//           return {
//             skill: skill,
//             list: createTotAndBonusElement(sS, true, [skill.skillName.name || ""])
//           };
//         } else {
//           return studiesInSkill[studyIndex];
//         }
//       })
//     : [];

//   if (consoleLog) console.log("skillsTotAndBonus", skillsTotAndBonus);

//   return skillsTotAndBonus;
// };