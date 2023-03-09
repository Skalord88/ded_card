package pl.kolendateam.dadcard.classCharacter.entity;

public enum TypeEnum {
    BASE_CLASS("base class"),
    PRESTIGE_CLASS("prestige class");

    private String typeEnum;

    private TypeEnum(String typeEnum){
        this.typeEnum = typeEnum;
    }

    public String getTypeEnum(){
        return typeEnum;
    }
}
