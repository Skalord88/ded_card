package pl.kolendateam.dadcard.size.entity;

public enum SizeEnum {
    SMALL("small"),
    MEDIUM("medium");

    private String sizeEnum;

    private SizeEnum(String sizeEnum){
        this.sizeEnum = sizeEnum;
    }

    public String getSizeEnum(){
        return sizeEnum;
    }
}
