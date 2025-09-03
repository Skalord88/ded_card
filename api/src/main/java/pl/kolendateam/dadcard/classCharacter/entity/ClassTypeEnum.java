package pl.kolendateam.dadcard.classCharacter.entity;

public enum ClassTypeEnum {
  RACE_CLASS("race class"),
  BASE_CLASS("base class"),
  PRESTIGE_CLASS("prestige class");

  private String typeEnum;

  private ClassTypeEnum(String typeEnum) {
    this.typeEnum = typeEnum;
  }

  public String getTypeEnum() {
    return typeEnum;
  }
}
