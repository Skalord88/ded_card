package pl.kolendateam.dadcard.weapons.entity;

import java.util.ArrayList;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.attack.entity.SpecialAttacks;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Weapons {

    int id;
    WeaponNameEnum name;
    double cost;
    WeaponNumericEnum damage;
    WeaponNumericEnum critical;
    WeaponNumericEnum rangeIncrement;
    double weight;
    ArrayList<WeaponCategoriesEnum> type;
    SpecialAttacks specialAttacks;
    String description;
    
}
