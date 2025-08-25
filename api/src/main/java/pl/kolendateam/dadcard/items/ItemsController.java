package pl.kolendateam.dadcard.items;

import java.util.ArrayList;
import java.util.List;
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
import pl.kolendateam.dadcard.items.enchantment.dto.EnchantmentDTO;
import pl.kolendateam.dadcard.items.enchantment.dto.ItemsToSendDTO;
import pl.kolendateam.dadcard.items.enchantment.entity.EnchantedItems;
import pl.kolendateam.dadcard.items.enchantment.entity.Enchantment;
import pl.kolendateam.dadcard.items.enchantment.repository.EnchantedItemsRepository;
import pl.kolendateam.dadcard.items.enchantment.repository.EnchantmentRepository;
import pl.kolendateam.dadcard.items.entity.Inventory;
import pl.kolendateam.dadcard.items.entity.Item;
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
    List<Item> itemsList = this.itemsRepository.findAll();

    ItemsListDTO itemsDTOList = new ItemsListDTO();

    return itemsDTOList.createListOfItemsDTO(itemsList, itemsDTOList);
  }

  @GetMapping("allEnchanted")
  public List<Object> showEnchantedItemsList() {
    List<EnchantedItems> enchantedList =
      this.enchantedItemsRepository.findAll();

    List<Item> itemsList = this.itemsRepository.findAll();

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
    @RequestBody ItemsToSendDTO inventoryDTO
  ) {
    Character character = characterRepository
      .findById(id)
      .orElseThrow(() ->
        new ResponseStatusException(HttpStatus.NOT_FOUND, "Character Not Found")
      );
    Inventory inventory = character.getInventory();
    if (inventory == null) {
      inventory = new Inventory();
    }
    inventory.addToInventory(
      inventoryDTO,
      itemsRepository,
      enchantedItemsRepository
    );

    character.setInventory(inventory);

    this.characterRepository.save(character); // <-- salvi solo il root entity

    return new CharacterDTO(character);
  }
}
