package pl.kolendateam.dadcard.modifier.dto;

import pl.kolendateam.dadcard.items.weapons.entity.WeaponNumericEnum;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;
import pl.kolendateam.dadcard.modifier.entity.SpecialAbilities;

public class SpecialAbilitiesDTO {

  public int id;
  public int specialType;
  public ModifierEnum attackQualities;
  public String name;
  public ModifierEnum type;
  public String description;
  public Integer dc;
  public ModifierEnum[] dcAbility;
  public Integer value;
  public String valueText;
  public WeaponNumericEnum damageDice;
  public Integer damageNumberDice;
  public Integer prerequisiteHd;
  public Integer maxValue;
  public String target;
  public String area;

  public SpecialAbilitiesDTO(SpecialAbilities special) {
    this.id = special.getId();
    this.specialType = special.getSpecialType();
    this.name = special.getName();
    this.type = special.getType();
    this.attackQualities =
      special.getAttackQualities() != null
        ? special.getAttackQualities()
        : null;
    this.description = special.getDescription();
    this.dc = special.getDc() != null ? special.getDc() : null;
    this.dcAbility =
      special.getDcAbility() != null ? special.getDcAbility() : null;
    this.value = special.getValue() != null ? special.getValue() : null;
    this.valueText =
      special.getValueText() != null ? special.getValueText() : null;
    this.damageDice =
      special.getDamageDice() != null ? special.getDamageDice() : null;
    this.damageNumberDice =
      special.getDamageNumberDice() != null
        ? special.getDamageNumberDice()
        : null;
    this.target = special.getTarget();
    this.prerequisiteHd =
      special.getPrerequisiteHd() != null ? special.getPrerequisiteHd() : null;
    this.maxValue =
      special.getMaxValue() != null ? special.getMaxValue() : null;
    this.area = special.getArea();
    this.target = special.getTarget();
  }
}
