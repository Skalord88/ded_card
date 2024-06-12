package pl.kolendateam.dadcard.items.entity;

public enum MaterialEnum {
    ADAMANTINE("ADAMANTINE"),
    DARKWOOD("DARKWOOD"),
    DRAGONHIDE("DRAGONHIDE"),
    IRON_COLD("IRON_COLD"),
    MITHRAL("MITHRAL"),
    SILVER_ALCHEMICAL("SILVER_ALCHEMICAL"),
    METAL("METAL"),
    LEATHER("LEATHER"),
    WOOD("WOOD");

    private String materialEnum;

    public String getMaterialEnum() {
        return materialEnum;
    }

    private MaterialEnum(String materialEnum) {
        this.materialEnum = materialEnum;
    }
}
