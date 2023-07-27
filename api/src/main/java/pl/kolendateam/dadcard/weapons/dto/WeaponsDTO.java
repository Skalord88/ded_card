package pl.kolendateam.dadcard.weapons.dto;

import java.lang.reflect.Type;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.attack.dto.SpecialAttacksDTO;
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
    public Integer range;
    public double weight;
    public WeaponCategoriesEnum[] type;
    public SpecialAttacksDTO specialAttacks;
    public String description;

    public WeaponsDTO(Weapons w) {
        this.id = w.getId();
        this.name = w.getName();
        this.cost = w.getCost();
        this.damage = w.getDamage();
        this.critical = w.getCritical();
        this.range = w.getRange();
        this.weight = w.getWeight();
        if(w.getSpecialAttacks() == null){
            this.specialAttacks = null;
        } else {
            Gson gson = new Gson();
            SpecialAttacksDTO sAttacksDTO = gson.fromJson(w.getSpecialAttacks(), SpecialAttacksDTO.class);
            this.specialAttacks = sAttacksDTO;
        }
        Gson gson = new Gson();
        Type listWeaponType = new TypeToken<WeaponCategoriesEnum[]>(){}.getType();
        WeaponCategoriesEnum[] typ = gson.fromJson(w.getType(), listWeaponType);
        this.type = typ;
        this.description = w.getDescription();
    }

    
    
}
