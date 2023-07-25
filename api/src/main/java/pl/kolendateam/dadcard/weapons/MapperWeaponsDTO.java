package pl.kolendateam.dadcard.weapons;

import java.util.ArrayList;
import java.util.List;

import pl.kolendateam.dadcard.weapons.dto.WeaponsDTO;
import pl.kolendateam.dadcard.weapons.entity.Weapons;

public class MapperWeaponsDTO {
    public static ArrayList<WeaponsDTO> toWeaponsDTO(List<Weapons> weapons){

        ArrayList<WeaponsDTO> weaponsDTOList = new ArrayList<>();
        for (Weapons w : weapons){
            WeaponsDTO wDTO = new WeaponsDTO(w);
            weaponsDTOList.add(wDTO);
        }

        return weaponsDTOList;
    }
}
