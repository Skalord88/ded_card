import { ClassPc } from "../../ClassPc/Interface/ClassPcLevel";
import { CharacterPc } from "../../interfaces";
import { SkillsInList } from "../interface/SkillsInList";
import { skillsList, studyList } from "../interface/SkillsList";
import { Study } from "../interface/Study";
import { StudyInList } from "../interface/StudysInList";

export const createSkillsList = (char: CharacterPc): SkillsInList[] => {
  const classSkillsId: number[] =
    char.classPcList?.flatMap(
      (cl) =>
        cl.classCharacter?.classSkill?.flatMap((clSkill) => clSkill.id) ?? []
    ) ?? [];

  const classStudysId: number[] =
    char.classPcList?.flatMap(
      (cl) =>
        cl.classCharacter?.classStudy?.flatMap((clStudy) => clStudy.id) ?? []
    ) ?? [];

  let list: SkillsInList[] = [];
  const studyL: Study[] = studyList.filter((st) =>
    classStudysId.includes(st.id)
  );

  skillsList.forEach((sL) => {
    const studyInList: StudyInList[] = studyL
      .filter((study) => study.skill.id === sL.id)
      .map((study) => ({
        study,
        dbRank: 0,
        rank:
          // char.skillsCharacter.find(s => s.study.id === study.id)?.rank ??
          0, // Default rank value, adjust if necessary
        classSkill: classStudysId.includes(study.id)
      }));

    const rank: number = char.skillsCharacter
      .filter((s) => sL.id === s.skill.id)
      .reduce((acc, s) => acc + s.rank, 0);

    list.push({
      skill: sL,
      study: studyInList,
      dbRank: rank,
      rank: rank,
      classSkill: classSkillsId.includes(sL.id) ? true : false,
      bonus: 0
    });
  });
  return list;
};

export function SkillPointsFromClass(classList: ClassPc[]): number {
  return classList.reduce(
    (total, cl) =>
      cl.firstClass
        ? total + cl.classCharacter.skillPoints * 4
        : total + cl.classCharacter.skillPoints,
    0
  );
}
