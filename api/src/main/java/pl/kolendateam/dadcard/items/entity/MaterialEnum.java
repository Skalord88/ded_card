package pl.kolendateam.dadcard.items.entity;

public enum MaterialEnum {
  ADAMANTINE("ADAMANTINE"),
  DARKWOOD("DARKWOOD"),
  DRAGONHIDE("DRAGONHIDE"),
  COLD_IRON("Cold Iron"),
  MITHRAL("MITHRAL"),
  ALCHEMICAL_SILVER("Alchemical Silver"),
  METAL("METAL"),
  LEATHER("LEATHER"),
  WOOD("WOOD");

  private String materialEnum;

  public String getMaterialEnum() {
    return materialEnum;
  }

  private MaterialEnum(String materialEnum) {
    this.materialEnum = materialEnum;
  }
}
