package pl.kolendateam.dadcard.spells;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
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
import pl.kolendateam.dadcard.classCharacter.repository.ClassRepository;
import pl.kolendateam.dadcard.spells.dto.BookDTO;
import pl.kolendateam.dadcard.spells.dto.SpellsAddDTO;
import pl.kolendateam.dadcard.spells.dto.SpellsDTO;
import pl.kolendateam.dadcard.spells.entity.Spells;
import pl.kolendateam.dadcard.spells.repository.BookRepository;
import pl.kolendateam.dadcard.spells.repository.SpellsRepository;
import pl.kolendateam.dadcard.spells.repository.SpellsTableRepository;

@CrossOrigin
@RestController
@RequestMapping("spells")
public class SpellsController {

  @PersistenceContext
  EntityManager entityManager;

  SpellsRepository spellsRepository;
  SpellsTableRepository spellsTableRepository;
  CharacterRepository characterRepository;
  ClassRepository classRepository;
  BookRepository bookRepository;

  public SpellsController() {}

  public SpellsRepository getSpellsRepository() {
    return spellsRepository;
  }

  @Autowired
  public SpellsController(
    SpellsRepository spellsRepository,
    SpellsTableRepository spellsTableRepository,
    CharacterRepository characterRepository,
    ClassRepository classRepository,
    BookRepository bookRepository
  ) {
    this.spellsRepository = spellsRepository;
    this.spellsTableRepository = spellsTableRepository;
    this.characterRepository = characterRepository;
    this.classRepository = classRepository;
    this.bookRepository = bookRepository;
  }

  @GetMapping("")
  public List<SpellsDTO> showSpellsList() {
    List<Spells> spellsList = this.spellsRepository.findAll();

    return MapperSpells.toSpellsDTO(spellsList);
  }

  // @GetMapping("{id}/spellstable")
  // public List<SpellsClassTableDTO> showSpellsTableList(@PathVariable int id) {
  //   List<SpellsTable> spellsTableList = this.spellsTableRepository.findAll();
  //   Optional<ClassCharacter> classOpt = this.classRepository.findById(id);

  //   if (!classOpt.isPresent()) {
  //     throw new ResponseStatusException(
  //       HttpStatus.NOT_FOUND,
  //       "Class Not Found"
  //     );
  //   }

  //   ClassCharacter classFromId = classOpt.get();

  //   return MapperSpellsTableDTO.toClassSpellsDTO(
  //     spellsTableList,
  //     classFromId.getSpellsKnown(),
  //     classFromId.getSpellsPerDay()
  //   );
  // }

  // @GetMapping("{id}")
  // public List<SpellsDTO> showSpellsClassList(@PathVariable int id) {
  //   List<Spells> spellsList = this.spellsRepository.findAll();
  //   Optional<ClassCharacter> classOpt = this.classRepository.findById(id);

  //   if (!classOpt.isPresent()) {
  //     throw new ResponseStatusException(
  //       HttpStatus.NOT_FOUND,
  //       "Class Not Found"
  //     );
  //   }

  //   ClassCharacter classFromId = classOpt.get();

  // return MapperSpells.toClassSpellsDTO(
  //   spellsList,
  //   classFromId.getSpellsDomain()
  // );
  // }

  @PostMapping(value = "{id}/addspells", consumes = { "application/json" })
  public CharacterDTO addSpellsKnown(
    @PathVariable int id,
    @RequestBody List<BookDTO> spellsToAddDTO
  ) {
    Optional<Character> characterOpt = this.characterRepository.findById(id);

    if (!characterOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Character Not Found"
      );
    }

    Character character = characterOpt.get();

    character.setCharacterBooks(spellsToAddDTO, entityManager);

    this.characterRepository.save(character);

    return new CharacterDTO(character);
  }

  // System.out.println(books);

  // this.bookRepository.saveAll(books);

  // this.characterRepository.save(character);

  @PostMapping(value = "{id}/sellspells", consumes = { "application/json" })
  public CharacterDTO removeSpellsKnown(
    @PathVariable int id,
    @RequestBody SpellsAddDTO SpellsAddDTO
  ) {
    Optional<Character> characterOpt = this.characterRepository.findById(id);

    if (!characterOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Character Not Found"
      );
    }

    Character character = characterOpt.get();

    this.characterRepository.save(character);

    return new CharacterDTO(character);
  }
}
