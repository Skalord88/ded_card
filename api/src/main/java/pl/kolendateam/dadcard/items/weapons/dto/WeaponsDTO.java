package pl.kolendateam.dadcard.items.weapons.dto;

import java.lang.reflect.Type;
import java.math.BigDecimal;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.attack.dto.SpecialAttacksDTO;
import pl.kolendateam.dadcard.items.weapons.entity.WeaponCategoriesEnum;
import pl.kolendateam.dadcard.items.weapons.entity.WeaponNameEnum;
import pl.kolendateam.dadcard.items.weapons.entity.WeaponNumericEnum;
import pl.kolendateam.dadcard.items.weapons.entity.Weapons;

@NoArgsConstructor
@AllArgsConstructor
public class WeaponsDTO {

    public short id;
    public WeaponNameEnum name;
    public BigDecimal cost;
    public WeaponNumericEnum damage;
    public WeaponNumericEnum critical;
    public Integer range;
    public BigDecimal weight;
    public WeaponCategoriesEnum[] type;
    public SpecialAttacksDTO specialAttacks;
    public String description;

    public WeaponsDTO(Weapons w) {
        this.id = w.getId();
        this.name = w.getWeaponName();
        this.cost = w.getCost();
        this.damage = w.getDamage();
        this.critical = w.getCritical();
        this.range = w.getRange();
        this.weight = w.getWeight();
        if(w.getSpecialAttacks() == null){
            this.specialAttacks = null;
        } else {
            SpecialAttacksDTO sAttacksDTO = new Gson().fromJson(w.getSpecialAttacks(), SpecialAttacksDTO.class);
            this.specialAttacks = sAttacksDTO;
        }
        Gson gson = new Gson();
        Type listWeaponType = new TypeToken<WeaponCategoriesEnum[]>(){}.getType();
        WeaponCategoriesEnum[] typ = gson.fromJson(w.getType(), listWeaponType);
        this.type = typ;
        this.description = w.getDescription();
    }

}
