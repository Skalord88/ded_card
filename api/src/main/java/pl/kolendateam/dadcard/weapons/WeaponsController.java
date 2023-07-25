package pl.kolendateam.dadcard.weapons;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.kolendateam.dadcard.weapons.dto.WeaponsDTO;
import pl.kolendateam.dadcard.weapons.entity.Weapons;
import pl.kolendateam.dadcard.weapons.repository.WeaponsRepository;

@RestController
@RequestMapping("weapons")
public class WeaponsController {

    WeaponsRepository weaponsRepository;

    @Autowired
    public WeaponsController(WeaponsRepository weaponsRepository){
        this.weaponsRepository = weaponsRepository;
    }

    @GetMapping("")
    public List<WeaponsDTO> showWeaponsList(){

        List<Weapons> weaponsList = this.weaponsRepository.findAll();

        return MapperWeaponsDTO.toWeaponsDTO(weaponsList);

    }
    
}
