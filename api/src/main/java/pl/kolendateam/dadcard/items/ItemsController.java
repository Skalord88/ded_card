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
import pl.kolendateam.dadcard.items.dto.ItemsListDTO;
import pl.kolendateam.dadcard.items.enchantment.dto.EnchantedItemsDTO;
import pl.kolendateam.dadcard.items.enchantment.dto.EnchantmentDTO;
import pl.kolendateam.dadcard.items.enchantment.entity.EnchantedItems;
import pl.kolendateam.dadcard.items.enchantment.entity.Enchantment;
import pl.kolendateam.dadcard.items.enchantment.repository.EnchantedItemsRepository;
import pl.kolendateam.dadcard.items.enchantment.repository.EnchantmentRepository;
import pl.kolendateam.dadcard.items.entity.Inventory;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.repository.InventoryRepository;
import pl.kolendateam.dadcard.items.repository.ItemsRepository;

@CrossOrigin
@RestController
@RequestMapping("item")
public class ItemsController {

  ItemsRepository itemsRepository;
  InventoryRepository inventoryRepository;
  CharacterRepository characterRepository;
  EnchantedItemsRepository enchantedItemsRepository;
  EnchantmentRepository enchantmentRepository;

  @Autowired
  public ItemsController(
    ItemsRepository itemsRepository,
    InventoryRepository inventoryRepository,
    CharacterRepository characterRepository,
    EnchantedItemsRepository enchantedItemsRepository,
    EnchantmentRepository enchantmentRepository
  ) {
    this.itemsRepository = itemsRepository;
    this.inventoryRepository = inventoryRepository;
    this.characterRepository = characterRepository;
    this.enchantedItemsRepository = enchantedItemsRepository;
    this.enchantmentRepository = enchantmentRepository;
  }

  @GetMapping("all")
  public ItemsListDTO showItemsList() {
    List<Items> itemsList = this.itemsRepository.findAll();

    ItemsListDTO itemsDTOList = new ItemsListDTO();

    return itemsDTOList.createListOfItemsDTO(itemsList, itemsDTOList);
  }

  @GetMapping("allEnchanted")
  public List<Object> showEnchantedItemsList() {
    List<EnchantedItems> enchantedList =
      this.enchantedItemsRepository.findAll();

    List<Items> itemsList = this.itemsRepository.findAll();

    return MapperItemsDTO.createListOfEnchantedDTO(enchantedList, itemsList);
  }

  @GetMapping("allEnchantments")
  public List<EnchantmentDTO> showEnchantmentList() {
    List<Enchantment> enchantmentsList = this.enchantmentRepository.findAll();
    List<EnchantmentDTO> listDTO = new ArrayList<>();

    enchantmentsList.forEach(item -> {
      listDTO.add(new EnchantmentDTO(item));
    });

    return listDTO;
  }

  @PostMapping(value = "{id}", consumes = { "application/json" })
  public CharacterDTO changeInventory(
    @PathVariable int id,
    @RequestBody List<EnchantedItemsDTO> inventoryDTO
  ) {
    Optional<Character> characterOpt = this.characterRepository.findById(id);
    if (!characterOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Character Not Found"
      );
    }
    Character character = characterOpt.get();

    Optional<Inventory> inventoryOpt =
      this.inventoryRepository.findById(character.getInventory().getId());
    if (!inventoryOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Inventory Not Found"
      );
    }
    Inventory inventory = inventoryOpt.get();

    inventory.addToInventory(
      inventoryDTO,
      itemsRepository,
      enchantedItemsRepository
    );

    this.inventoryRepository.save(inventory);

    return new CharacterDTO(character);
  }
  // @GetMapping("inventory/{id}")
  // public InventoryDTO getCharacterInventory(@PathVariable int id) {
  //   Optional<Character> characterOpt = this.characterRepository.findById(id);
  //   if (!characterOpt.isPresent()) {
  //     throw new ResponseStatusException(
  //       HttpStatus.NOT_FOUND,
  //       "Character Not Found"
  //     );
  //   }
  //   Character character = characterOpt.get();

  //   Optional<Inventory> inventoryOpt =
  //     this.inventoryRepository.findById(character.getInventory().getId());
  //   if (!inventoryOpt.isPresent()) {
  //     throw new ResponseStatusException(
  //       HttpStatus.NOT_FOUND,
  //       "Character Not Found"
  //     );
  //   }
  //   Inventory characterInventory = inventoryOpt.get();

  //   return new InventoryDTO(characterInventory);
  // }

  // @PostMapping(value = "/change", consumes = { "application/json" })
  // public List<Items> changeItem(@RequestBody ItemsListDTO itemListDTO) {
  //   if (itemListDTO.armorsList != null && !itemListDTO.armorsList.isEmpty()) {
  //     Armors newArmor = MapperItems.toArmor(itemListDTO.armorsList.get(0));
  // Optional<Armors> existingArmor =
  // this.itemsRepository.findArmorsByEnchantmentAndArmorTypeAndFailureAndPenalityAndMaterial(
  // newArmor.getEnchantment(),
  // newArmor.getArmorType(),
  // newArmor.getFailure(),
  // newArmor.getPenality(),
  // newArmor.getMaterial()
  // );
  // if (!existingArmor.isPresent()) {
  //   newArmor.setId(null);
  //   this.itemsRepository.save(newArmor);
  // }
  // }
  // if (itemListDTO.shieldList != null && !itemListDTO.shieldList.isEmpty()) {
  //   Shields newShield = MapperItems.toShield(itemListDTO.shieldList.get(0));
  // Optional<Shields> existingShield =
  // this.itemsRepository.findShieldsByEnchantmentAndArmorTypeAndFailureAndPenalityAndMaterial(
  // newShield.getEnchantment(),
  // newShield.getArmorType(),
  // newShield.getFailure(),
  // newShield.getPenality(),
  // newShield.getMaterial()
  // );
  // if (!existingShield.isPresent()) {
  //   newShield.setId(null);
  //   this.itemsRepository.save(newShield);
  // }
  // }
  // if (itemListDTO.weaponsList != null && !itemListDTO.weaponsList.isEmpty()) {
  //   List<Weapons> listOfWeapons = MapperItems.toListOfWeapons(
  //     itemListDTO.weaponsList
  //   );
  //   listOfWeapons.forEach(weapon -> {
  // Optional<Weapons> existingWeapon =
  // this.itemsRepository.findWeaponsByEnchantmentAndMaterial(
  // weapon.getEnchantment(),
  // weapon.getMaterial()
  // );
  // if (!existingWeapon.isPresent()) {
  //   weapon.setId(null);
  //   this.itemsRepository.save(weapon);
  // }
  //     });
  //   }
  //   return this.itemsRepository.findAll();
  // }

  // Optional<Inventory> inventoryOpt =
  //   this.inventoryRepository.findById(character.getInventory().getId());
  // if (!inventoryOpt.isPresent()) {
  //   throw new ResponseStatusException(
  //     HttpStatus.NOT_FOUND,
  //     "Character Not Found"
  //   );
  // }

  // List<Items> itemsList = this.itemsRepository.findAll();

  // Inventory characterInventory = inventoryOpt.get();

  // characterInventory.addToInventory(inventoryDTO
  // , itemsList
  // );

  // this.characterRepository.save(character);

  // return new CharacterDTO(
  //   character
  // ,
  // characterInventory,
  // character.getAttacks(),
  // character.getClassPcArray()
  //   );
  // }
}
