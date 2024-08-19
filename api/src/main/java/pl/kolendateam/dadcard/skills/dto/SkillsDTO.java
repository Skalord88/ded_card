package pl.kolendateam.dadcard.skills.dto;

import java.util.Set;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.abilitys.entity.AbilityEnum;

@NoArgsConstructor
public class SkillsDTO {

  public short idSkill;
  public String nameSkill;
  public Set<StudyDTO> fieldOfStudy;
  public boolean classSkill;
  public double skillRank;
  // public int skillAbilityBonus;
  public AbilityEnum skillAbility;
  public int skillBonus;

  public SkillsDTO(short id, String name, AbilityEnum ability) {
    this.idSkill = id;
    this.nameSkill = name;
    this.skillAbility = ability;
  }
}
