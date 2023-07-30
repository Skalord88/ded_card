package pl.kolendateam.dadcard.weapons.entity;

public enum WeaponCategoriesEnum {
    
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
    SLASHING("Slashing"); 

    private String weaponEnum;

    public String getWeaponEnum(){
        return weaponEnum;
    }

    private WeaponCategoriesEnum(String weaponEnum){
        this.weaponEnum = weaponEnum; 
    }

}
