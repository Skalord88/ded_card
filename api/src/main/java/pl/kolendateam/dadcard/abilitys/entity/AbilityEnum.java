package pl.kolendateam.dadcard.abilitys.entity;

public enum AbilityEnum {
  STRENGHT("Streght"),
  DEXTERITY("Dexterity"),
  CONSTITUTION("Constitution"),
  INTELLIGENCE("Intelligence"),
  WISDOM("Wisdom"),
  CHARISMA("Charisma");

  private String abilityEnum;

  public String getAbilityEnum() {
    return abilityEnum;
  }

  private AbilityEnum(String abilityEnum) {
    this.abilityEnum = abilityEnum;
  }
}
