package pl.kolendateam.dadcard.items.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.items.entity.Items;

@NoArgsConstructor
public class ItemsDTO implements Serializable {

  public int id;
  public String name;
  public double cost;
  public BigDecimal weight;
  public String description;
  public String itemType;

  public ItemsDTO(int idZero) {
    this.id = idZero;
  }

  public ItemsDTO(Items item) {
    this.id = item.getId();
    this.name = item.getName();
    this.cost = item.getCost();
    this.weight = item.getWeight();
    this.description = item.getDescription();
    this.itemType = item.getItemType().toString();
  }
}
