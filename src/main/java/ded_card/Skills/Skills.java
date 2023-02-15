package ded_card.Skills;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Skills {
    
    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer skillsId;

    private String skillsName;

    public String getSkillsName() {
        return skillsName;
    }

    public void setSkillsName(String skillsName) {
        this.skillsName = skillsName;
    }

    public Skills(String skillsName) {
        this.skillsName = skillsName;
    }

    public Skills() {
    }

}
