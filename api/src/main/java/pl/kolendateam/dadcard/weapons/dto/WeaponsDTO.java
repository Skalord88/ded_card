package pl.kolendateam.dadcard.weapons.dto;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.attack.entity.SpecialAttacks;
import pl.kolendateam.dadcard.skills.entity.ClassSkills;
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
        this.id = w.getId();
        this.name = w.getName();
        this.cost = w.getCost();
        this.damage = w.getDamage();
        this.critical = w.getCritical();
        this.rangeIncrement = w.getRangeIncrement();
        this.weight = w.getWeight();

        Gson gson = new Gson();
        Type listWeaponType = new TypeToken<List<WeaponCategoriesEnum>>(){}.getType();
        ArrayList<WeaponCategoriesEnum> typ = gson.fromJson(w.getType().toString(), listWeaponType);
        
        this.type = typ;
        this.description = w.getDescription();
    }

    
    
}
