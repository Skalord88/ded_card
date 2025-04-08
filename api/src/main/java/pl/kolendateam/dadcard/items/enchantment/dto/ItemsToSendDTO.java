package pl.kolendateam.dadcard.items.enchantment.dto;

import java.util.List;
import lombok.ToString;

@ToString
public class ItemsToSendDTO {

  public List<EnchantedItemsDTO> backpack;
  public List<EnchantedItemsDTO> inventory;
}
