package pl.kolendateam.dadcard.skills.dto;

import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.abilitys.entity.AbilityEnum;
import pl.kolendateam.dadcard.skills.MapperStudyToDTO;
import pl.kolendateam.dadcard.skills.entity.ClassStudy;
import pl.kolendateam.dadcard.skills.entity.Skills;

@NoArgsConstructor
@AllArgsConstructor
public class SkillsDTO {

  public short idSkill;
  public String nameSkill;
  public Set<StudyDTO> fieldOfStudy;
  public boolean classSkill;
  public double skillRank;
  public AbilityEnum skillAbility;
  public int skillBonus;

  public SkillsDTO(Skills skill) {
    this.idSkill = skill.getId();
    this.nameSkill = skill.getName();
    this.skillAbility = skill.getAbility();
  }

  public SkillsDTO(short id, int bonus) {
    this.idSkill = id;
    this.skillBonus = bonus;
  }

  public SkillsDTO(
    short id,
    String name,
    AbilityEnum ability,
    double bonus,
    Set<ClassStudy> fieldOfStudy
  ) {
    this.idSkill = id;
    this.nameSkill = name;
    this.skillAbility = ability;
    this.skillRank = bonus;
    this.fieldOfStudy = MapperStudyToDTO.toStudyListDTO(fieldOfStudy);
  }
}
