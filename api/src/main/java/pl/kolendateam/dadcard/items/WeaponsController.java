package pl.kolendateam.dadcard.items;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import pl.kolendateam.dadcard.items.weapons.MapperWeaponsDTO;
import pl.kolendateam.dadcard.items.weapons.dto.WeaponsDTO;
import pl.kolendateam.dadcard.items.weapons.entity.Weapons;
import pl.kolendateam.dadcard.items.weapons.repository.WeaponsRepository;

@RestController
@RequestMapping("weapons")
public class WeaponsController {

    WeaponsRepository weaponsRepository;
    CharacterRepository characterRepository;

    @Autowired
    public WeaponsController(WeaponsRepository weaponRepository,CharacterRepository characterRepository){
        this.weaponsRepository = weaponRepository;
        this.characterRepository = characterRepository;
    }

    @GetMapping("")
    public List<WeaponsDTO> showWeaponsList(){

        List<Weapons> weaponsList = this.weaponsRepository.findAll();

        return MapperWeaponsDTO.toWeaponsDTO(weaponsList);

    }

    @PostMapping(value = "{id}", consumes = {"application/json"})
    public CharacterDTO buyWeapons(@PathVariable int id, @RequestBody WeaponsDTO wDTO){
        Optional<Character> characterOpt = this.characterRepository.findById(id);

        if (!characterOpt.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Character Not Found");
        }

        Optional<Weapons> weaponOpt = this.weaponsRepository.findById(wDTO.id);

        if (!weaponOpt.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Weapon Not Found");
        }

        Weapons weapon = weaponOpt.get();
        
        Character character = characterOpt.get();

        character.buyItems(weapon);

        this.characterRepository.save(character);

        return new CharacterDTO (character);

    }

    @PostMapping(value = "{id}/sell", consumes = {"application/json"})
    public CharacterDTO sellWeapons(@PathVariable int id, @RequestBody WeaponsDTO wDTO){
        Optional<Character> characterOpt = this.characterRepository.findById(id);

        if (!characterOpt.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Character Not Found");
        }

        Optional<Weapons> weaponOpt = this.weaponsRepository.findById(wDTO.id);

        if (!weaponOpt.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Weapon Not Found");
        }

        Weapons weapon = weaponOpt.get();

        Character character = characterOpt.get();

        int indexOfItem = weapon.findItemIndexinArrayById(character.getItems(),weapon);

        character.sellItem(indexOfItem);

        this.characterRepository.save(character);

        return new CharacterDTO (character);

    }

}
