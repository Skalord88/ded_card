package pl.kolendateam.dadcard.feats.entity;

public enum FeatsTypeEnum {
  GENERAL("General"),
  FIGHTER("Fighter"),
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
