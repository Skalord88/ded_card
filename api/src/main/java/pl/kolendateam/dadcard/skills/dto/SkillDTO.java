package pl.kolendateam.dadcard.skills.dto;

import pl.kolendateam.dadcard.abilitys.entity.AbilityEnum;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;
import pl.kolendateam.dadcard.skills.entity.Skill;

public class SkillDTO {

  public int id;
  public ModifierEnum skillName;
  public AbilityEnum ability;
  public int penality;

  public SkillDTO(Skill skill) {
    this.id = skill.getId();
    this.skillName = skill.getName();
    this.ability = skill.getAbility();
    this.penality = skill.getPenality();
  }
}
