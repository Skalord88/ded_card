package pl.kolendateam.dadcard.items.wondrous_items.dto;

import java.math.BigDecimal;
import pl.kolendateam.dadcard.items.wondrous_items.entity.WondrousItems;

public class WonderousItemsDTO {

  public short id;
  public String name;
  public BigDecimal cost;
  public BigDecimal weight;
  public String description;

  public WonderousItemsDTO(WondrousItems item) {
    this.id = item.getId();
    this.name = item.getName();
    this.cost = item.getCost();
    this.weight = item.getWeight();
    this.description = item.getDescription();
  }
}
