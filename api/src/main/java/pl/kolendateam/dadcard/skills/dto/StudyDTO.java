package pl.kolendateam.dadcard.skills.dto;

public class StudyDTO {
    
    public int id;
    public String skill;
    public String study;
    public int rank;

    public StudyDTO(String studyName, String skillName) {
        this.study = studyName;
        this.skill = skillName;
    }
    
}
