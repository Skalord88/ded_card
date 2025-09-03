package pl.kolendateam.dadcard.feats.entity;

public enum FeatsTypeEnum {
  ALL("All"),
  GENERAL("General"),
  FIGHTER("Fighter"),
  MAGE("Mage"),
  MAGIC("Magic"),
  DIVINE("Divine"),
  SKILLS("Skills"),
  REGIONAL("Regional"),
  ITEM_CREATION("Item creation"),
  METAMAGIC("Metamagic"),
  CLASS("Class"),
  RACIAL("Racial");

  private String featsTypeEnum;

  private FeatsTypeEnum(String featsTypeEnum) {
    this.featsTypeEnum = featsTypeEnum;
  }

  public String getFeatsTypeEnum() {
    return featsTypeEnum;
  }
}
