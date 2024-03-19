package pl.kolendateam.dadcard.items.common_item.dto;

import java.io.Serializable;
import java.math.BigDecimal;

import pl.kolendateam.dadcard.items.common_item.entity.CommonItems;
import pl.kolendateam.dadcard.items.entity.ItemTypeEnum;

public class CommonItemsDTO implements Serializable {

    public int id;
    public String name;
    public ItemTypeEnum itemType;
    public BigDecimal cost;
    public BigDecimal weight;
    public String description;

    public CommonItemsDTO(CommonItems item) {
        this.id = item.getId();
        this.name = item.getName();
        this.itemType = ItemTypeEnum.WONDROUS_ITEM;
        this.cost = item.getCost();
        this.weight = item.getWeight();
        this.description = item.getDescription();
    }

}
