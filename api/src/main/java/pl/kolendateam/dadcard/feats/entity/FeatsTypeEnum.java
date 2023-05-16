package pl.kolendateam.dadcard.feats.entity;

public enum FeatsTypeEnum {
    GENERAL ("General"),
    REGIONAL("Regional"),
    ITEM_CREATION("Item Creation"),
    METAMAGIC("Metamagic");

    private String featsTypeEnum;

    private FeatsTypeEnum(String featsTypeEnum){
        this.featsTypeEnum = featsTypeEnum;
    }

    public String getFeatsTypeEnum(){
        return featsTypeEnum;
    }
}
