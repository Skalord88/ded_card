package pl.kolendateam.dadcard.items.weapons.entity;

public enum WeaponNumericEnum {
  D1("D1"),
  D10("D10"),
  D12("D12"),
  D2("D2"),
  D3("D3"),
  D4("D4"),
  DD4("DD4"),
  D6("D6"),
  DD6("DD6"),
  D6_D6("D6_D6"),
  D8("D8"),
  D8_D6("D8_D6"),
  D8_D8("D8_D8"),
  NA("NA"),
  D20("D20"),
  D100("D100"),
  X2("x2"),
  X2_1920("19-20 x2"),
  X2_1820("18-20 x2"),
  X2_1620("16-20 x2"),
  X3("X3"),
  X3_1920("19-20 x3"),
  X4("x4"),
  X4_1920("19-20 x4"),
  X3X4("x3x4"),
  X3X4_1920("19-20 x3 / 19-20 x4");

  private String weaponNumericEnum;

  public String getWeaponNumericEnum() {
    return weaponNumericEnum;
  }

  private WeaponNumericEnum(String weaponNumericEnum) {
    this.weaponNumericEnum = weaponNumericEnum;
  }
}
