package pl.kolendateam.dadcard.size.entity;

public enum SizeEnum {
  NONE("none"),
  FINE("fine"),
  DIMINUTIVE("diminutive"),
  TINY("tiny"),
  SMALL("small"),
  MEDIUM("medium"),
  LARGE("large"),
  HUGE("huge"),
  GARGANTUAN("gargantuan"),
  COLOSSAL("colossal");

  private String sizeEnum;

  private SizeEnum(String sizeEnum) {
    this.sizeEnum = sizeEnum;
  }

  public String getSizeEnum() {
    return sizeEnum;
  }
}
