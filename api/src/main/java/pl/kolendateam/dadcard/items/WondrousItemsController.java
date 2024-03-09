package pl.kolendateam.dadcard.items;

import java.util.List;
import javax.swing.plaf.basic.BasicComboBoxUI.ItemHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.wondrous_items.dto.WonderousItemsDTO;
import pl.kolendateam.dadcard.items.wondrous_items.entity.WondrousItems;
import pl.kolendateam.dadcard.items.wondrous_items.repository.WondrousItemsRepository;

@CrossOrigin
@RestController
@RequestMapping("wondrousItem")
public class WondrousItemsController {

  WondrousItemsRepository wondrousItemsRepository;
  CharacterRepository characterRepository;

  @Autowired
  public WondrousItemsController(
    WondrousItemsRepository wondrousItemsRepository,
    CharacterRepository characterRepository
  ) {
    this.wondrousItemsRepository = wondrousItemsRepository;
    this.characterRepository = characterRepository;
  }

  @GetMapping("")
  public List<WonderousItemsDTO> showItemsList() {
    List<WondrousItems> itemsList = this.wondrousItemsRepository.findAll();

    return MapperItemsDTO.toWondrousItemsDTO(itemsList);
  }
}
