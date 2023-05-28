package pl.kolendateam.dadcard.feats.entity;

public enum FeatsTypeEnum {
    GENERAL("general"),
    REGIONAL("regional"),
    ITEM_CREATION("item creation"),
    METAMAGIC("metamagic"),
    CLASS("class");

    private String featsTypeEnum;

    private FeatsTypeEnum(String featsTypeEnum){
        this.featsTypeEnum = featsTypeEnum;
    }

    public String getFeatsTypeEnum(){
        return featsTypeEnum;
    }
}
