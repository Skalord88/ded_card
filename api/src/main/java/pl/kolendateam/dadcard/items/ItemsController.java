package pl.kolendateam.dadcard.items;

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

    return itemsDTOList.createListOfItemsDTO(itemsList, itemsDTOList);
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

  @PostMapping(value = "/change", consumes = { "application/json" })
  public ItemsListDTO changeItem(@RequestBody ItemsListDTO itemListDTO) {

    List<Items> itemsList = this.itemsRepository.findAll();
    int lastId = itemsList.size();

    boolean find = false;
    if (itemListDTO.armorsList != null) {
      for (ArmorsDTO armorFromListDTO : itemListDTO.armorsList) {
        for (Items item : itemsList) {
          if (item.getId() == armorFromListDTO.id) {
            Armors newArmor = MapperItems.toArmor(armorFromListDTO);
            if (!newArmor.checkEqual((Armors) item)) {
              find = true;
              break;
            }
          }
        }
        if (find) {
          lastId++;
          Armors newArmor = MapperItems.toArmor(armorFromListDTO);
          newArmor.setId(lastId);
          itemsRepository.save(newArmor);
          find = false;
        }
      }
    }
    if (itemListDTO.shieldList != null) {
      for (ShieldsDTO shieldFromListDTO : itemListDTO.shieldList) {
        for (Items item : itemsList) {
          if (shieldFromListDTO.id == item.getId()) {
            Shields newShield = MapperItems.toShield(shieldFromListDTO);
            if (!newShield.checkEqual((Shields) item)) {
              find = true;
              break;
            }
          }
        }
        if (find) {
          lastId++;
          Shields newShields = MapperItems.toShield(shieldFromListDTO);
          newShields.setId(lastId);
          itemsRepository.save(newShields);
          find = false;
        }
      }
    }
    if (itemListDTO.weaponsList != null) {
      for (WeaponsDTO weaponFromListDTO : itemListDTO.weaponsList) {
        for (Items item : itemsList) {
          if (weaponFromListDTO.id == item.getId()) {
            Weapons newWeapon = MapperItems.toWeapon(weaponFromListDTO);
            if (!newWeapon.checkEqual((Weapons) item)) {
              find = true;
              break;
            }
          }
        }
        if (find) {
          lastId++;
          Weapons newWeapon = MapperItems.toWeapon(weaponFromListDTO);
          newWeapon.setId(lastId);
          itemsRepository.save(newWeapon);
          find = false;
        }
      }
    }

    return itemListDTO;
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

    this.inventoryRepository.save(characterInventory);

    return new CharacterDTO(character, characterInventory);
  }

}
