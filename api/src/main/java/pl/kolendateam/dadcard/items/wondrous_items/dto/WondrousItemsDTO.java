package pl.kolendateam.dadcard.items.wondrous_items.dto;

import java.math.BigDecimal;
import pl.kolendateam.dadcard.items.entity.ItemTypeEnum;
import pl.kolendateam.dadcard.items.wondrous_items.entity.WondrousItems;

public class WondrousItemsDTO {

  public short id;
  public String name;
  public ItemTypeEnum itemType;
  public BigDecimal cost;
  public BigDecimal weight;
  public String description;

  public WondrousItemsDTO(WondrousItems item) {
    this.id = item.getId();
    this.name = item.getName();
    this.itemType = ItemTypeEnum.WONDROUS_ITEM;
    this.cost = item.getCost();
    this.weight = item.getWeight();
    this.description = item.getDescription();
  }
}