package pl.kolendateam.dadcard.characterCard;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pl.kolendateam.dadcard.attack.repository.AttacksRepository;
import pl.kolendateam.dadcard.characterCard.dto.CharacterDTO;
import pl.kolendateam.dadcard.characterCard.dto.CreateCharacterDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPcToAddDTO;
import pl.kolendateam.dadcard.classCharacter.repository.ClassPcRepository;
import pl.kolendateam.dadcard.classCharacter.repository.ClassRepository;
import pl.kolendateam.dadcard.feats.repository.FeatRepository;
import pl.kolendateam.dadcard.items.repository.InventoryRepository;
import pl.kolendateam.dadcard.items.repository.ItemsRepository;
import pl.kolendateam.dadcard.skills.repository.SkillsRepository;
import pl.kolendateam.dadcard.spells.repository.BookRepository;
import pl.kolendateam.dadcard.spells.repository.SpellsTableRepository;

@RestController
@CrossOrigin
@RequestMapping("character-card")
public class CharacterController {

  ClassRepository classRepository;
  CharacterRepository characterRepository;
  ClassPcRepository classPcRepository;
  FeatRepository featsRepository;
  SkillsRepository skillsRepository;
  SpellsTableRepository spellsTableRepository;
  InventoryRepository inventoryRepository;
  AttacksRepository attacksRepository;
  ItemsRepository itemsRepository;
  BookRepository bookRepository;

  @Autowired
  public CharacterController(
    CharacterRepository characterRepository,
    ClassRepository classRepository,
    ClassPcRepository classPcRepository,
    FeatRepository featsRepository,
    SkillsRepository skillsRepository,
    SpellsTableRepository spellsTableRepository,
    InventoryRepository inventoryRepository,
    AttacksRepository attacksRepository,
    ItemsRepository itemsRepository,
    BookRepository bookRepository
  ) {
    this.characterRepository = characterRepository;
    this.classRepository = classRepository;
    this.classPcRepository = classPcRepository;
    this.featsRepository = featsRepository;
    this.skillsRepository = skillsRepository;
    this.spellsTableRepository = spellsTableRepository;
    this.inventoryRepository = inventoryRepository;
    this.attacksRepository = attacksRepository;
    this.itemsRepository = itemsRepository;
    this.bookRepository = bookRepository;
  }

  @GetMapping(value = "/list")
  public ArrayList<CharacterDTO> characterCardGet() {
    List<Character> characterList = this.characterRepository.findAll();

    ArrayList<CharacterDTO> characterListDTO = new ArrayList<>();

    for (Character character : characterList) {
      CharacterDTO characterDTO = new CharacterDTO(character);
      characterListDTO.add(characterDTO);
    }

    return characterListDTO;
  }

  @GetMapping(value = "/listcreate")
  public ArrayList<CreateCharacterDTO> characterCreateCardGet() {
    List<Character> characterList = this.characterRepository.findAll();

    ArrayList<CreateCharacterDTO> characterListDTO = new ArrayList<>();

    for (Character character : characterList) {
      CreateCharacterDTO characterDTO = new CreateCharacterDTO(character);
      characterListDTO.add(characterDTO);
    }

    return characterListDTO;
  }

  @PostMapping(value = "", consumes = "application/json")
  public CreateCharacterDTO createCharacter(
    @RequestBody CreateCharacterDTO createCharacterDTO
  ) {
    Character character = new Character(
      createCharacterDTO.characterName,
      createCharacterDTO.playerName
    );

    this.characterRepository.save(character);

    return new CreateCharacterDTO(character);
  }

  @DeleteMapping(value = "/{id}/remove")
  public void removeCharacter(@PathVariable int id) {
    System.out.println("Attempting to delete character with id: " + id);
    if (characterRepository.existsById(id)) {
      characterRepository.deleteById(id);
    } else {
      throw new RuntimeException("Character not found");
    }
  }

  @GetMapping(value = "{id}")
  public CharacterDTO showCharacter(@PathVariable int id) {
    Optional<Character> characterOpt = this.characterRepository.findById(id);

    if (!characterOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Character Not Found"
      );
    }

    Character character = characterOpt.get();

    return new CharacterDTO(character);
  }

  @PostMapping(value = "class/{id}", consumes = { "application/json" })
  public CharacterDTO setCharacterClass(
    @PathVariable int id,
    @RequestBody List<ClassPcToAddDTO> listOfClassDTO
  ) {
    Optional<Character> characterOpt = this.characterRepository.findById(id);

    if (!characterOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Character Not Found"
      );
    }

    Character character = characterOpt.get();

    character.setNewClassPcArrayFromDTO(listOfClassDTO, id);

    this.characterRepository.save(character);

    return new CharacterDTO(character);
  }
}
