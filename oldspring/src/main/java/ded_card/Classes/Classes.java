package ded_card.Classes;

import java.util.ArrayList;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Classes {
    
    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer classId;

    @Enumerated (EnumType.STRING)
    private ClassName className;
    private boolean classPrestige;
    private double classBaseAttackBonus;
    private ArrayList<String> classSavingThrow = new ArrayList<>();
    private int classSkillPoints;
    private ArrayList<String> classSkills = new ArrayList<>();

}
