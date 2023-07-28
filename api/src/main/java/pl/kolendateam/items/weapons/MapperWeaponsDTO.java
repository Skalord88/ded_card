package pl.kolendateam.items.weapons;

import java.util.ArrayList;
import java.util.List;

import pl.kolendateam.items.weapons.dto.WeaponsDTO;
import pl.kolendateam.items.weapons.entity.Weapons;

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
