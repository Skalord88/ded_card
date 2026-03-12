package pl.kolendateam.dadcard.items.weapons.entity;

public enum WeaponCategoriesEnum {
  PROFICIENCY("Proficency"),
  NATURAL("Natural Weapon"),
  SIMPLE("Simple"),
  MARTIAL("Martial"),
  EXOTIC("Exotic"),
  UNARMED("Unarmed"),
  IMPROVISED("Impovised"),
  MELEE("Melee"),
  RANGED("Ranged"),
  REACH("Reach"),
  DOUBLE("Doubled"),
  THROWN("Thrown"),
  PROJECTILE("Projectile"),
  AMMUNITION("Ammunition"),
  LIGHT("Light"),
  ONE_HANDED("One handed"),
  TWO_HANDED("Two handed"),
  NONLETHAL("Non lethal"),
  BLUDGEONING("Bludgeoning"),
  PIERCING_OR_SLASHING("Piercing or Slashing"),
  PIERCING("Piercing"),
  SLASHING("Slashing"),
  BLUDGEONING_PIERCING("Bludgeoning and Piercing"),
  SLASHING_PIERCING("Slashing and Piercing"),
  BLUDGEONING_PIERCING_SLASHING("Bludgeoning, Piercing and Slashing");

  private String weaponEnum;

  public String getWeaponEnum() {
    return weaponEnum;
  }

  private WeaponCategoriesEnum(String weaponEnum) {
    this.weaponEnum = weaponEnum;
  }
}
