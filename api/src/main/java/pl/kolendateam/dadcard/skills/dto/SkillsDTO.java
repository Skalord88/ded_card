package pl.kolendateam.dadcard.skills.dto;

import java.util.Set;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class SkillsDTO {

  public short idSkill;
  public String nameSkill;
  public Set<StudyDTO> fieldOfStudy;
  public boolean classSkill;
  public double skillRank;
  public int skillAbilityBonus;
  public String skillAbility;
  public int skillBonus;

  public SkillsDTO(short id, String name) {
    this.idSkill = id;
    this.nameSkill = name;
  }
}
