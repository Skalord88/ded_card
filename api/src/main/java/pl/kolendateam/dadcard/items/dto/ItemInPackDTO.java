package pl.kolendateam.dadcard.items.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.items.enchantment.dto.EnchantedItemsDTO;
import pl.kolendateam.dadcard.items.entity.ItemInPack;

@NoArgsConstructor
@AllArgsConstructor
public class ItemInPackDTO {

  public int id;
  public EnchantedItemsDTO item;
  public int quantity;

  public ItemInPackDTO(ItemInPack item) {
    this.id = item.getId();
    this.item = new EnchantedItemsDTO(item.getItem());
    this.quantity = item.getQuantity();
  }
}
