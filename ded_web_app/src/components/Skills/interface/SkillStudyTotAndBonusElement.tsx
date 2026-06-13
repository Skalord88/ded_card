import { TotAndBonusElement } from "../../SummaryChar/SummaryChar"
import { Skill } from "./Skill"
import { Study } from "./Study"

export type StudyTotAndBonusElement = {
    study: Study
    list: TotAndBonusElement[]
}

export type SkillStudyTotAndBonusElement = {

    skill: Skill
    studies?: StudyTotAndBonusElement[]
    list?: TotAndBonusElement[];

}