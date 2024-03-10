package pl.kolendateam.dadcard.items;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;
import pl.kolendateam.dadcard.items.armor.dto.ArmorsDTO;
import pl.kolendateam.dadcard.items.armor.entity.Armors;
import pl.kolendateam.dadcard.items.dto.ItemsListDTO;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.repository.ItemsRepository;
import pl.kolendateam.dadcard.items.weapons.dto.WeaponsDTO;
import pl.kolendateam.dadcard.items.weapons.entity.Weapons;
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
  public ItemsListDTO showItemsList() {
    List<Items> itemsList = this.itemsRepository.findAll();

    ItemsListDTO itemsDTOList = new ItemsListDTO();
    ArrayList<ArmorsDTO> armorDTOList = new ArrayList<>();
    ArrayList<WeaponsDTO> weaponsDTOList = new ArrayList<>();
    ArrayList<WonderousItemsDTO> wonderousItemsDTOList = new ArrayList<>();

    itemsList.forEach(item -> {
      if (item instanceof Armors) {
        armorDTOList.add(MapperItemsDTO.toArmorDTO((Armors) item));
      } else if (item instanceof Weapons) {
        weaponsDTOList.add(MapperItemsDTO.toWeaponDTO((Weapons) item));
      } else if (item instanceof WondrousItems) {
        wonderousItemsDTOList.add(
          MapperItemsDTO.toWondrousItemsDTO((WondrousItems) item)
        );
      }
    });

    itemsDTOList.setListOfArmors(armorDTOList);
    itemsDTOList.setListOfWeapons(weaponsDTOList);
    itemsDTOList.setListOfWonderousItem(wonderousItemsDTOList);

    // itemsDTOList.add(new ArrayList<>(armorDTOList));
    // itemsDTOList.add(new ArrayList<>(weaponsDTOList));
    // itemsDTOList.add(new ArrayList<>(wonderousItemsDTOList));

    return itemsDTOList;
  }
  // @GetMapping("wonderousItems")
  // public List<WonderousItemsDTO> showWonderousItemsList() {
  //   List<WondrousItems> itemsList = this.wondrousItemsRepository.findAll();

  //   return MapperItemsDTO.toWondrousItemsDTO(itemsList);
  // }
}
