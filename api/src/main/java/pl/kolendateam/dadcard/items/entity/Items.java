package pl.kolendateam.dadcard.items.entity;

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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.items.armor.dto.ArmorsDTO;
import pl.kolendateam.dadcard.items.armor.dto.ShieldsDTO;
import pl.kolendateam.dadcard.items.weapons.dto.WeaponsDTO;

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
public class Items implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  short id;

  String name;
  BigDecimal cost;
  BigDecimal weight;
  String description;

  public Items(ArmorsDTO armor) {
    this.id = (short) armor.id;
    this.cost = armor.cost;
    this.weight = armor.weight;
    this.description = armor.description;
  }

  public Items(ShieldsDTO shild) {
    this.id = (short) shild.id;
    this.cost = shild.cost;
    this.weight = shild.weight;
    this.description = shild.description;
  }

  public Items(WeaponsDTO weapon) {
    this.id = (short) weapon.id;
    this.cost = weapon.cost;
    this.weight = weapon.weight;
    this.description = weapon.description;
  }

  public String getItemType() {
    return this.getClass().getAnnotation(DiscriminatorValue.class).value();
  }

  public int findItemIndexinArrayById(ArrayList<Items> items, Items w) {
    for (int i = 0; i < items.size(); i++) {
      if (items.get(i).id == w.id) {
        return i;
      }
    }
    return -1;
  }
}
