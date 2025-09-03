package pl.kolendateam.dadcard.classCharacter.entity;

public enum EnumClass {
  BARBARIAN("Barbarian"),
  BARD("Bard"),
  CLERIC("Cleric"),
  DRUID("Druid"),
  FIGHTER("Fighter"),
  MONK("Monk"),
  PALADIN("Paladin"),
  RANGER("Ranger"),
  ROGUE("Rogue"),
  SORCERER("Sorcerer"),
  WIZARD("Wizard"),
  ARCANE_ARCHER("Arcane Archer"),
  ARCANE_TRICKSTER("Arcane Trickster"),
  ARCHMAGE("Archmage"),
  ASSASSIN("Assassin"),
  BLACKGUARD("Blackguard"),
  DRAGON_DISCIPLE("Dragon Disciple"),
  DUELIST("Duelist"),
  DWARVEN_DEFENDER("Dwarven Defender"),
  HIEROPHANT("Hierophant"),
  HORIZON_WALKER("Horizon Walker"),
  LOREMASTER("Loremaster"),
  MYSTIC_THEURGE("Mystic Theurge"),
  SHADOWDANCER("Shadowdancer"),
  THAUMATURGIST("Thaumaturgist"),
  WARSLING_SNIPER("Warsling Sniper"),
  STORMLORD("Stormlord"),
  CLASS("Class"),
  ABBERRATION("Abberation"),
  ANIMAL("Animal"),
  CONSTRUCT("Construct"),
  DRAGON("Dragon"),
  WATER_ELEMENTAL("Water Elemental"),
  FIRE_ELEMENTAL("Fire Elemental"),
  EARTH_ELEMENTAL("Earth Elemental"),
  AIR_ELEMENTAL("Air Elemental"),
  FEY("Fey"),
  GIANT("Giant"),
  HUMANOID("Humanoid"),
  MAGICAL_BEAST("Magical Beast"),
  MONSTROUS_HUMANOID("Monstrous Humanoid"),
  OOZE("Ooze"),
  PLANT("Plant"),
  UNDEAD("Undead"),
  VERMIN("Vermin");

  private String raceTypesEnum;

  private EnumClass(String raceTypesEnum) {
    this.raceTypesEnum = raceTypesEnum;
  }
}
