package pl.kolendateam.dadcard.items.entity;

import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
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

  public int findItemIndexinArrayById(ArrayList<Items> items, Items w) {
    for (int i = 0; i < items.size(); i++) {
      if (items.get(i).id == w.id) {
        return i;
      }
    }
    return -1;
  }
}
