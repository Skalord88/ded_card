package pl.kolendateam.dadcard.feats.dto;

import java.util.ArrayList;
import java.util.HashMap;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.armorClass.entity.ArmorClass;
import pl.kolendateam.dadcard.attack.entity.SpecialAttacks;
import pl.kolendateam.dadcard.classCharacter.entity.SavingThrow;
import pl.kolendateam.dadcard.skills.entity.ClassSkills;

@AllArgsConstructor
@NoArgsConstructor
public class PrerequisiteDTO {

    ArrayList<String> race;
    String size;
    SavingThrow savingThrow;
    ArmorClass armorClass;
    ArrayList<ClassSkills> classSkills;
    Abilitys ability;
    SpecialAttacks specialAttacks;
    int bab;
    HashMap<String,Integer> skill;
    ArrayList<String> feats;
    
}
