package pl.kolendateam.dadcard.items;

import java.util.List;
import javax.swing.plaf.basic.BasicComboBoxUI.ItemHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;
import pl.kolendateam.dadcard.items.dto.ItemsDTO;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.repository.ItemsRepository;
import pl.kolendateam.dadcard.items.wondrous_items.dto.WonderousItemsDTO;
import pl.kolendateam.dadcard.items.wondrous_items.entity.WondrousItems;
import pl.kolendateam.dadcard.items.wondrous_items.repository.WondrousItemsRepository;

@CrossOrigin
@RestController
@RequestMapping("item")
public class ItemsController {

  ItemsRepository itemsRepository;
  WondrousItemsRepository wondrousItemsRepository;
  CharacterRepository characterRepository;

  @Autowired
  public ItemsController(
    ItemsRepository itemsRepository,
    WondrousItemsRepository wondrousItemsRepository,
    CharacterRepository characterRepository
  ) {
    this.itemsRepository = itemsRepository;
    this.wondrousItemsRepository = wondrousItemsRepository;
    this.characterRepository = characterRepository;
  }

  @GetMapping("all")
  public List<ItemsDTO> showItemsList() {
    List<Items> itemsList = this.itemsRepository.findAll();

    return MapperItemsDTO.toItemsDTO(itemsList);
  }

  @GetMapping("wonderousItems")
  public List<WonderousItemsDTO> showWonderousItemsList() {
    List<WondrousItems> itemsList = this.wondrousItemsRepository.findAll();

    return MapperItemsDTO.toWondrousItemsDTO(itemsList);
  }
}
