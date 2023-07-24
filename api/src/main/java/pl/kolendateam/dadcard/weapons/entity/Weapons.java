package pl.kolendateam.dadcard.weapons.entity;

import java.util.ArrayList;
import java.util.HashMap;

import pl.kolendateam.dadcard.attack.entity.SpecialAttacks;

public class Weapons {

    int id;
    WeaponNameEnum name;
    WeaponCategoriesEnum category;
    double cost;
    HashMap<Integer,WeaponNumericEnum> damage;
    WeaponNumericEnum critical;
    WeaponNumericEnum rangeIncrement;
    double weight;
    ArrayList<WeaponCategoriesEnum> type;
    SpecialAttacks specialAttacks;
    String description;
    
}
