package pl.kolendateam.dadcard.items;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pl.kolendateam.dadcard.characterCard.dto.CharacterDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;
import pl.kolendateam.dadcard.items.armor.dto.ArmorsDTO;
import pl.kolendateam.dadcard.items.armor.entity.Armors;
import pl.kolendateam.dadcard.items.dto.InventoryDTO;
import pl.kolendateam.dadcard.items.dto.ItemsListDTO;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.repository.ItemsRepository;
import pl.kolendateam.dadcard.items.weapons.dto.WeaponsDTO;
import pl.kolendateam.dadcard.items.weapons.entity.Weapons;
import pl.kolendateam.dadcard.items.wondrous_items.dto.WondrousItemsDTO;
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
    ArrayList<WondrousItemsDTO> wonderousItemsDTOList = new ArrayList<>();

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

    return itemsDTOList;
  }

  @PostMapping(value = "{id}", consumes = { "application/json" })
  public CharacterDTO setInventory(
    @PathVariable short id,
    @RequestBody InventoryDTO inventoryDTO
  ) {
    Optional<Character> characterOpt = this.characterRepository.findById(id);

    if (!characterOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Character Not Found"
      );
    }

    Character character = characterOpt.get();

    character.addItemsToCharacterInventory(inventoryDTO);

    return new CharacterDTO(character);
  }
}
