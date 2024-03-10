package pl.kolendateam.dadcard.items.dto;

import java.math.BigDecimal;
import pl.kolendateam.dadcard.items.entity.Items;

public class ItemsDTO {

  public short id;
  public String name;
  public BigDecimal cost;
  public BigDecimal weight;
  public String description;
  public String itemType;

  public ItemsDTO(Items item) {
    this.id = item.getId();
    this.name = item.getName();
    this.cost = item.getCost();
    this.weight = item.getWeight();
    this.description = item.getDescription();
    this.itemType = item.getItemType();
  }
}
