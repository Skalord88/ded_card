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
import pl.kolendateam.dadcard.items.armor.dto.ShieldsDTO;
import pl.kolendateam.dadcard.items.armor.entity.Armors;
import pl.kolendateam.dadcard.items.armor.entity.Shields;
import pl.kolendateam.dadcard.items.dto.InventoryDTO;
import pl.kolendateam.dadcard.items.dto.ItemsListDTO;
import pl.kolendateam.dadcard.items.entity.Inventory;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.repository.InventoryRepository;
import pl.kolendateam.dadcard.items.repository.ItemsRepository;
import pl.kolendateam.dadcard.items.weapons.dto.WeaponsDTO;
import pl.kolendateam.dadcard.items.weapons.entity.Weapons;
import pl.kolendateam.dadcard.items.wondrous_items.dto.WondrousItemsDTO;
import pl.kolendateam.dadcard.items.wondrous_items.entity.WondrousItems;

@CrossOrigin
@RestController
@RequestMapping("item")
public class ItemsController {

  ItemsRepository itemsRepository;
  InventoryRepository inventoryRepository;
  CharacterRepository characterRepository;

  @Autowired
  public ItemsController(
      ItemsRepository itemsRepository,
      InventoryRepository inventoryRepository,
      CharacterRepository characterRepository) {
    this.itemsRepository = itemsRepository;
    this.inventoryRepository = inventoryRepository;
    this.characterRepository = characterRepository;
  }

  @GetMapping("all")
  public ItemsListDTO showItemsList() {
    List<Items> itemsList = this.itemsRepository.findAll();

    ItemsListDTO itemsDTOList = new ItemsListDTO();
    ArrayList<ArmorsDTO> armorDTOList = new ArrayList<>();
    ArrayList<ShieldsDTO> shieldsDTOList = new ArrayList<>();
    ArrayList<WeaponsDTO> weaponsDTOList = new ArrayList<>();
    ArrayList<WondrousItemsDTO> wonderousItemsDTOList = new ArrayList<>();

    itemsList.forEach(item -> {
      if (item instanceof Armors) {
        armorDTOList.add(MapperItemsDTO.toArmorDTO((Armors) item));
      } else if (item instanceof Shields) {
        shieldsDTOList.add(MapperItemsDTO.toShieldDTO((Shields) item));
      } else if (item instanceof Weapons) {
        weaponsDTOList.add(MapperItemsDTO.toWeaponDTO((Weapons) item));
      } else if (item instanceof WondrousItems) {
        wonderousItemsDTOList.add(
            MapperItemsDTO.toWondrousItemsDTO((WondrousItems) item));
      }
    });

    itemsDTOList.setListOfArmors(armorDTOList);
    itemsDTOList.setListOfShields(shieldsDTOList);
    itemsDTOList.setListOfWeapons(weaponsDTOList);
    itemsDTOList.setListOfWonderousItem(wonderousItemsDTOList);

    return itemsDTOList;
  }

  @GetMapping("inventory/{id}")
  public InventoryDTO getCharacterInventory(
      @PathVariable short id) {

    Optional<Character> characterOpt = this.characterRepository.findById(id);
    if (!characterOpt.isPresent()) {
      throw new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          "Character Not Found");
    }
    Character character = characterOpt.get();

    Optional<Inventory> inventoryOpt = this.inventoryRepository.findById(character.getInventory().getId());
    if (!inventoryOpt.isPresent()) {
      throw new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          "Character Not Found");
    }
    Inventory characterInventory = inventoryOpt.get();

    return new InventoryDTO(characterInventory);
  }

  @PostMapping(value = "{id}", consumes = { "application/json" })
  public CharacterDTO changeInventory(
      @PathVariable short id,
      @RequestBody InventoryDTO inventoryDTO) {

    Optional<Character> characterOpt = this.characterRepository.findById(id);
    if (!characterOpt.isPresent()) {
      throw new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          "Character Not Found");
    }
    Character character = characterOpt.get();

    Optional<Inventory> inventoryOpt = this.inventoryRepository.findById(character.getInventory().getId());
    if (!inventoryOpt.isPresent()) {
      throw new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          "Character Not Found");
    }

    List<Items> itemsList = this.itemsRepository.findAll();

    Inventory characterInventory = inventoryOpt.get();

    characterInventory.addToInventory(inventoryDTO, itemsList);

    // character.addItemsToCharacterInventory(inventoryDTO);

    this.inventoryRepository.save(characterInventory);
    // this.characterRepository.save(character);

    return new CharacterDTO(character, characterInventory);
  }
}
