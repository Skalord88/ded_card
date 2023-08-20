package pl.kolendateam.dadcard.weapons.entity;

public enum WeaponNumericEnum {

    D1("D1"),
    D10("D10"),
    D12("D12"),
    D2("D2"),
    D3("D3"),
    D4("D4"),
    Dd4("Dd4"),
    D6("D6"),
    Dd6("Dd6"),
    D6_D6("D6_D6"),
    D8("D8"),
    D8_D6("D8_D6"),
    D8_D8("D8_D8"),
    Na("Na"),
    D20("D20"),
    D100("D100"),
    X2("X2"),
    X3("X3"),
    X4("X4"),
    X2_1920("X2_1920"),
    X2_1820("X2_1820"),
    X3X4("X3X4");

    private String weaponNumericEnum;

    public String getWeaponNumericEnum(){
        return weaponNumericEnum;
    }

    private WeaponNumericEnum(String weaponNumericEnum){
        this.weaponNumericEnum = weaponNumericEnum; 
    }
    
}
