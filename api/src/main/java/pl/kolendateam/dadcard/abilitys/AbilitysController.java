package pl.kolendateam.dadcard.abilitys;

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
import pl.kolendateam.dadcard.abilitys.dto.AbilitysDTO;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.characterCard.dto.CharacterAbilityDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;

@RestController
@CrossOrigin
@RequestMapping("ability")
public class AbilitysController {

  CharacterRepository characterRepository;

  @Autowired
  AbilitysController(CharacterRepository characterRepository) {
    this.characterRepository = characterRepository;
  }

  @GetMapping(value = "{id}")
  public CharacterAbilityDTO showCharacterAbility(@PathVariable int id) {
    Optional<Character> characterOpt = this.characterRepository.findById(id);

    if (!characterOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Character Not Found"
      );
    }

    Character character = characterOpt.get();
    return new CharacterAbilityDTO(character);
  }

  @PostMapping(value = "{id}", consumes = { "application/json" })
  public CharacterAbilityDTO setCharacterAbility(
    @PathVariable int id,
    @RequestBody AbilitysDTO abilitysDTO
  ) {
    Optional<Character> characterOpt = this.characterRepository.findById(id);

    if (!characterOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Character Not Found"
      );
    }

    Character character = characterOpt.get();

    Abilitys abilitys = new Abilitys();

    abilitys.setCharacterAbility(abilitysDTO);

    character.setAbilitys(abilitys);

    // character.createArmorClass();

    this.characterRepository.save(character);

    return new CharacterAbilityDTO(character);
  }
}
