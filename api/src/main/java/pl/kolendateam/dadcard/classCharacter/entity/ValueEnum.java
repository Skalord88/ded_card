package pl.kolendateam.dadcard.classCharacter.entity;

public enum ValueEnum {
    HIGH ("h"),
    LOW ("l");

    private String valueEnum;

    private ValueEnum(String valueEnum){
        this.valueEnum = valueEnum;
    }

    public String getValueEnum(){
        return valueEnum;
    }
}
