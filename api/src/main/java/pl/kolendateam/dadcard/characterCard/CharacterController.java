package pl.kolendateam.dadcard.characterCard;

import java.util.ArrayList;
import java.util.HashMap;
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
import pl.kolendateam.dadcard.attack.entity.Attacks;
import pl.kolendateam.dadcard.attack.repository.AttacksRepository;
import pl.kolendateam.dadcard.characterCard.dto.CharacterDTO;
import pl.kolendateam.dadcard.characterCard.dto.CreateCharacterDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.characterCard.entity.Vitality;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPcDTO;
import pl.kolendateam.dadcard.classCharacter.entity.ClassCharacter;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPc;
import pl.kolendateam.dadcard.classCharacter.entity.EnumClass;
import pl.kolendateam.dadcard.classCharacter.repository.ClassRepository;
import pl.kolendateam.dadcard.feats.entity.CharacterFeat;
import pl.kolendateam.dadcard.feats.entity.Feats;
import pl.kolendateam.dadcard.feats.repository.FeatsRepository;
import pl.kolendateam.dadcard.items.entity.Inventory;
import pl.kolendateam.dadcard.items.repository.InventoryRepository;
import pl.kolendateam.dadcard.items.repository.ItemsRepository;
import pl.kolendateam.dadcard.skills.entity.Skills;
import pl.kolendateam.dadcard.skills.repository.SkillsRepository;
import pl.kolendateam.dadcard.spells.entity.Book;
import pl.kolendateam.dadcard.spells.entity.SpellsTable;
import pl.kolendateam.dadcard.spells.repository.BookRepository;
import pl.kolendateam.dadcard.spells.repository.SpellsTableRepository;

@RestController
@CrossOrigin
@RequestMapping("character-card")
public class CharacterController {

  ClassRepository classRepository;
  CharacterRepository characterRepository;
  FeatsRepository featsRepository;
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
    FeatsRepository featsRepository,
    SkillsRepository skillsRepository,
    SpellsTableRepository spellsTableRepository,
    InventoryRepository inventoryRepository,
    AttacksRepository attacksRepository,
    ItemsRepository itemsRepository,
    BookRepository bookRepository
  ) {
    this.characterRepository = characterRepository;
    this.classRepository = classRepository;
    this.featsRepository = featsRepository;
    this.skillsRepository = skillsRepository;
    this.spellsTableRepository = spellsTableRepository;
    this.inventoryRepository = inventoryRepository;
    this.attacksRepository = attacksRepository;
    this.itemsRepository = itemsRepository;
    this.bookRepository = bookRepository;
  }

  @GetMapping(value = "/list")
  public ArrayList<CreateCharacterDTO> characterCardGet() {
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

    List<Skills> skillsList = this.skillsRepository.findAll();
    character.createSkillsArray(skillsList);

    this.characterRepository.save(character);

    return new CreateCharacterDTO(character);
  }

  @PostMapping("/remove")
  public void removeCharacter(@RequestBody int id) {
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

    Optional<Inventory> inventoryOpt =
      this.inventoryRepository.findById(character.getInventory().getId());
    if (!inventoryOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Inventory Not Found"
      );
    }

    Inventory characterInventory = inventoryOpt.get();

    Optional<Attacks> attacksOpt =
      this.attacksRepository.findById(character.getAttacks().getId());
    if (!inventoryOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Inventory Not Found"
      );
    }

    Attacks characterAttacks = attacksOpt.get();

    return new CharacterDTO(character, characterInventory, characterAttacks);
  }

  @PostMapping(value = "class/{id}", consumes = { "application/json" })
  public CharacterDTO setCharacterClass(
    @PathVariable int id,
    @RequestBody ClassPcDTO classPcDTO
  ) {
    Optional<Character> characterOpt = this.characterRepository.findById(id);

    if (!characterOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Character Not Found"
      );
    }

    Character character = characterOpt.get();

    Optional<ClassCharacter> classOpt =
      this.classRepository.findById(classPcDTO.id);

    if (!classOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Class Not Found"
      );
    }

    List<Feats> featsList = this.featsRepository.findAll();
    List<SpellsTable> spellsTableList = this.spellsTableRepository.findAll();

    ClassCharacter classCharacter = classOpt.get();

    ArrayList<ClassPc> classPcList = character.getClassPcArray();

    ClassPc classPc = new ClassPc(
      classCharacter.getId(),
      classCharacter.getName(),
      (byte) 1,
      classCharacter.getHitDice(),
      classCharacter.getSavingThrow(),
      classCharacter.getClassBab(),
      classCharacter.getSpellsPerDay(),
      classCharacter.getSpellsKnown(),
      classCharacter.getSpellsDomain()
    );

    character.incrementEffectiveCharacterLv();

    // skills & hp
    if (character.getEffectiveCharacterLv() == 1) {
      character.calculateSkillPointsFirstLevel(classCharacter.getSkillPoints());
      character.hitPointsFirstLevel(classCharacter.getHitDice());
    } else {
      character.calculateSkillPoints(classCharacter.getSkillPoints());
      character.hitPointsNewLevel(classCharacter.getHitDice());
    }

    // class
    int indexClassInDB = classPc.findIndexInArrayById(classPcList);

    if (indexClassInDB == -1) {
      character.addClassToPcArray(classPc);
      character.setSkillsTruePcArray(classCharacter.getAvailableSkills());
    } else {
      character.incrementLevelClassForIndex(indexClassInDB);
    }

    int levelClassInDB = classPc.findLevelInArrayById(
      classPcList,
      classCharacter.getId()
    );

    // study
    character.addStudyToCharacter(classCharacter.getAvailableStudy());

    // saving throw
    if (levelClassInDB == 1) {
      character.addSavingThrowLevelOne(classPc.getSavingThrow());
    } else if (levelClassInDB > 1) {
      character.incementSavingThrow();
    }

    character.incrementBab(classCharacter.getClassBab());

    // feat
    List<CharacterFeat> characterFeatsFromClass = character.listFeatsFromClass(
      levelClassInDB,
      featsList,
      classCharacter.getClassFeatsMap()
    );

    for (CharacterFeat chFeat : characterFeatsFromClass) {
      character.addFeatToPc(chFeat);
    }

    // magic
    boolean magicClass = character.magicClass(classCharacter.getSpellsPerDay());

    if (magicClass) {
      character.addMagic(
        spellsTableList,
        classCharacter.getSpellsPerDay(),
        classCharacter.getSpellsKnown()
      );
      int sizeMagic = character
        .getMagicKnown()
        .get(classCharacter.getName())
        .length;

      // magicKnown
      boolean findClassInBooks = character.getClassSpellsKnown(
        classCharacter.getName()
      );

      if (findClassInBooks) {
        character.addSpellKnown(sizeMagic - 1, classCharacter.getName());
      } else {
        character.addNewSpellsKnown(sizeMagic, classCharacter.getName());
      }
    }

    // experience
    character.setCharacterExperience();

    // gold
    if (character.getEffectiveCharacterLv() == 1) {
      character.setFirstLevelGold(classCharacter.getInitialGold());
    } else {
      character.setLevelGold();
    }

    this.characterRepository.save(character);

    return new CharacterDTO(character);
  }

  @PostMapping(value = "minus_class/{id}", consumes = { "application/json" })
  public CharacterDTO minusCharacterClass(
    @PathVariable int id,
    @RequestBody ClassPcDTO classPcDTO
  ) {
    Optional<Character> characterOpt = this.characterRepository.findById(id);

    if (!characterOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Character Not Found"
      );
    }

    Character character = characterOpt.get();

    Optional<ClassCharacter> classOpt =
      this.classRepository.findById(classPcDTO.id);

    if (!classOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Class Not Found"
      );
    }

    List<Feats> featsList = this.featsRepository.findAll();
    List<ClassCharacter> allClassesList = this.classRepository.findAll();
    List<SpellsTable> spellsTableList = this.spellsTableRepository.findAll();

    ClassCharacter classCharacter = classOpt.get();

    ArrayList<ClassPc> classPcList = character.getClassPcArray();

    ClassPc classPc = new ClassPc(
      classCharacter.getId(),
      classCharacter.getName(),
      (byte) 1,
      classCharacter.getHitDice(),
      classCharacter.getSavingThrow(),
      classCharacter.getClassBab(),
      classCharacter.getSpellsPerDay(),
      classCharacter.getSpellsKnown(),
      classCharacter.getSpellsDomain()
    );

    // feat
    int levelClassInDB = character.findLevelInClassesById(
      classCharacter.getId()
    );
    // classPc.findLevelInArrayById(
    //   classPcList,
    //   classCharacter.getId()
    // );
    List<CharacterFeat> characterFeatsFromClass = character.listFeatsFromClass(
      levelClassInDB,
      featsList,
      classCharacter.getClassFeatsMap()
    );

    for (CharacterFeat chFeat : characterFeatsFromClass) {
      character.removeFeatFromPc(chFeat);
    }

    character.decrementEffectiveCharacterLv();

    // class
    int indexClassInDB = classPc.findIndexInArrayById(classPcList);
    if (levelClassInDB == 1) {
      character.removeClassFromPcArray(indexClassInDB);
    }
    if (levelClassInDB > 1) {
      character.decrementLevelClassForIndex(indexClassInDB);
    }

    // skillPoints & hp
    if (character.getEffectiveCharacterLv() == 0) {
      character.setSkillPoints(0);
      HashMap<Integer, Integer> vitaHD = new HashMap<>();
      Vitality vita = new Vitality(0, vitaHD, 0);
      character.setVitality(vita);
    } else {
      character.decalculateSkillPoints(classCharacter.getSkillPoints());
      character.hitPointsLastLevel(classCharacter.getHitDice());
    }

    // re-trueSkills
    character.zeroSkillsRank();
    if (character.getClassPcArray().size() != 0) {
      for (ClassPc cP : character.getClassPcArray()) {
        for (ClassCharacter cC : allClassesList) {
          if (cC.getId() == cP.getId()) {
            character.setSkillsTruePcArray(cC.getAvailableSkills());
          }
        }
      }
    } else {
      character.allSkillsFalse();
      character.allKnowledgeZero();
    }

    // study
    character.removeStudyFromCharacter(classCharacter.getAvailableStudy());

    // saving throw
    if (levelClassInDB > 1) {
      character.decementSavingThrow();
    }
    if (levelClassInDB == 1) {
      character.minusSavingThrowLevelOne(classPc.getSavingThrow());
    }

    // magic
    if (
      character.getClassPcArray() == null ||
      character.getClassPcArray().isEmpty()
    ) {
      character.setMagicKnown(new HashMap<EnumClass, Integer[]>());
      character.setMagicPerDay(new HashMap<EnumClass, Integer[]>());
      character.setBooks(new ArrayList<Book>());
    }

    boolean magicClass = character.magicClass(classCharacter.getSpellsPerDay());

    if (magicClass) {
      if (levelClassInDB == 1) {
        character.removePerDayKnow(classCharacter.getName());
        // books
        character.removeBook(classCharacter.getName());
      }
      if (levelClassInDB > 1) {
        character.addMagic(
          spellsTableList,
          classCharacter.getSpellsPerDay(),
          classCharacter.getSpellsKnown()
        );
        // books
        int sizeMagic = character.getSizeMagic(classCharacter.getName());
        character.decrementBooks(sizeMagic, classCharacter.getName());
      }
    }
    // base attack bonus
    character.decrementBab(classCharacter.getClassBab());

    // experience
    if (character.getEffectiveCharacterLv() == 0) {
      character.setZeroExp();
    } else {
      character.setCharacterExperience();
    }

    // gold
    if (character.getEffectiveCharacterLv() == 1) {
      character.setFirstLevelGold(classCharacter.getInitialGold());
    } else {
      character.setLevelGold();
    }

    // items
    if (character.getEffectiveCharacterLv() == 0) {
      character.emptyInventory();
    }

    this.characterRepository.save(character);

    return new CharacterDTO(character);
  }
}
