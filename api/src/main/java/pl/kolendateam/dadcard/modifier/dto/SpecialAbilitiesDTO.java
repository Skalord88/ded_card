package pl.kolendateam.dadcard.modifier.dto;

import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;
import pl.kolendateam.dadcard.modifier.entity.SpecialAbilities;

public class SpecialAbilitiesDTO {

  public int id;
  public String name;
  public ModifierEnum type;
  public String description;
  public Integer dc;
  public ModifierEnum[] dcAbility;
  public Integer value;
  public String target;
  public String area;

  public SpecialAbilitiesDTO(SpecialAbilities special) {
    this.id = special.getId();
    this.name = special.getName();
    this.type = special.getType();
    this.description = special.getDescription();
    this.dc = special.getDc() != null ? special.getDc() : null;
    this.dcAbility =
      special.getDcAbility() != null ? special.getDcAbility() : null;
    this.value = special.getValue() != null ? special.getValue() : null;
    this.target = special.getTarget();
    this.area = special.getArea();
  }
}
