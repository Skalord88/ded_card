package pl.kolendateam.dadcard.skills.dto;

public class StudyDTO {
    
    public short idStudy;
    public short idSkill;
    public String skill;
    public String study;
    public int rank;

    public StudyDTO(short idSk, String studyName, String skillName) {
        this.idSkill = idSk;
        this.study = studyName;
        this.skill = skillName;
    }
    
}
