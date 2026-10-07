package pl.kolendateam.dadcard.items.entity;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import pl.kolendateam.dadcard.items.dto.ItemInPackDTO;
import pl.kolendateam.dadcard.items.enchantment.entity.EnchantedItems;

@Getter
@Setter
@Entity
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ItemInPack implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  @ManyToOne
  @JoinColumn(name = "item_id", referencedColumnName = "id")
  EnchantedItems item;

  int quantity;

  public ItemInPack(ItemInPackDTO item) {
    this.id = item.id;
    this.item = new EnchantedItems(item.item.id);
    this.quantity = item.quantity;
  }
}
