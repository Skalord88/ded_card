package pl.kolendateam.dadcard.size.entity;

public enum SizeEnum {
    TINY("tiny")
    SMALL("small"),
    MEDIUM("medium"),
    LARGE("large");

    private String sizeEnum;

    private SizeEnum(String sizeEnum){
        this.sizeEnum = sizeEnum;
    }

    public String getSizeEnum(){
        return sizeEnum;
    }
}
