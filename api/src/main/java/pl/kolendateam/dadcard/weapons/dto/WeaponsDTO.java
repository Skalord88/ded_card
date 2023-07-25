package pl.kolendateam.dadcard.weapons.dto;

import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.attack.entity.SpecialAttacks;
import pl.kolendateam.dadcard.weapons.entity.WeaponCategoriesEnum;
import pl.kolendateam.dadcard.weapons.entity.WeaponNameEnum;
import pl.kolendateam.dadcard.weapons.entity.WeaponNumericEnum;
import pl.kolendateam.dadcard.weapons.entity.Weapons;

@NoArgsConstructor
@AllArgsConstructor
public class WeaponsDTO {

    public int id;
    public WeaponNameEnum name;
    public double cost;
    public WeaponNumericEnum damage;
    public WeaponNumericEnum critical;
    public WeaponNumericEnum rangeIncrement;
    public double weight;
    public ArrayList<WeaponCategoriesEnum> type;
    public SpecialAttacks specialAttacks;
    public String description;

    public WeaponsDTO(Weapons w) {
        
    }
    
}
