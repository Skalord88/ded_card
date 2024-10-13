package pl.kolendateam.dadcard.items.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.items.armor.dto.ArmorsDTO;
import pl.kolendateam.dadcard.items.armor.dto.ShieldsDTO;
import pl.kolendateam.dadcard.items.weapons.dto.WeaponsDTO;
import pl.kolendateam.dadcard.items.wondrous_items.dto.WondrousItemsDTO;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@DiscriminatorColumn(
  name = "item_type",
  discriminatorType = DiscriminatorType.STRING
)
@EqualsAndHashCode
public class Items implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Integer id;

  String name;
  double cost;
  BigDecimal weight;
  String description;

  public Items(ArmorsDTO armor) {
    this.id = armor.id;
    this.name = armor.name;
    this.cost = armor.cost;
    this.weight = armor.weight;
    this.description = armor.description;
  }

  public Items(ShieldsDTO shield) {
    this.id = shield.id;
    this.name = shield.name;
    this.cost = shield.cost;
    this.weight = shield.weight;
    this.description = shield.description;
  }

  public Items(WeaponsDTO weapon) {
    this.id = weapon.id;
    this.name = weapon.name.toString();
    this.cost = weapon.cost;
    this.weight = weapon.weight;
    this.description = weapon.description;
  }

  public Items(WondrousItemsDTO item) {
    this.id = item.id;
    this.name = item.name;
    this.cost = item.cost;
    this.weight = item.weight;
    this.description = item.description;
  }

  @JsonProperty("itemType")
  public ItemTypeEnum getItemType() {
    String item =
      this.getClass().getAnnotation(DiscriminatorValue.class).value();

    ItemTypeEnum itemEnum = ItemTypeEnum.valueOf(item);

    return itemEnum;
  }

  public void setItemType(ItemTypeEnum itemType) {}

  public int findItemIndexinArrayById(ArrayList<Items> items, Items w) {
    for (int i = 0; i < items.size(); i++) {
      if (items.get(i).id == w.id) {
        return i;
      }
    }
    return -1;
  }

  public Items(int idZero) {
    this.id = idZero;
  }
}
