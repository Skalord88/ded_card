package pl.kolendateam.dadcard.characterCard.entity;

public enum AbilityEnum {

    STRENGHT("Streght"),
    DEXTRITY("Dextrity"),
    CONSTITUTION("Constitution"),
    INTELLIGENCE("Intelligence"),
    WISDOM("Wisdom"),
    CHARISMA("Charisma");

    private String abilityEnum;

    public String getAbilityEnum(){
        return abilityEnum;
    }

    private AbilityEnum(String abilityEnum){
        this.abilityEnum = abilityEnum; 
    }
    
}
