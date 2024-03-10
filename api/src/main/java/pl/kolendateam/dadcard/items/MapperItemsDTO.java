package pl.kolendateam.dadcard.items;

import java.util.ArrayList;
import java.util.List;
import pl.kolendateam.dadcard.items.dto.ItemsDTO;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.wondrous_items.dto.WonderousItemsDTO;
import pl.kolendateam.dadcard.items.wondrous_items.entity.WondrousItems;

public class MapperItemsDTO {

  public static List<ItemsDTO> toItemsDTO(List<Items> itemsList) {
    ArrayList<ItemsDTO> itemsDTOList = new ArrayList<>();
    itemsList.forEach(item -> {
      ItemsDTO iDTO = new ItemsDTO(item);
      itemsDTOList.add(iDTO);
    });

    return itemsDTOList;
  }

  public static List<WonderousItemsDTO> toWondrousItemsDTO(
    List<WondrousItems> items
  ) {
    ArrayList<WonderousItemsDTO> itemsDTOList = new ArrayList<>();
    items.forEach(item -> {
      WonderousItemsDTO iDTO = new WonderousItemsDTO(item);
      itemsDTOList.add(iDTO);
    });

    return itemsDTOList;
  }
}
