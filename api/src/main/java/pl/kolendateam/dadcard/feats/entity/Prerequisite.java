package pl.kolendateam.dadcard.feats.entity;

import java.util.ArrayList;
import java.util.HashMap;

import com.google.gson.Gson;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.armorClass.entity.ArmorClass;
import pl.kolendateam.dadcard.attack.entity.SpecialAttacks;
import pl.kolendateam.dadcard.classCharacter.entity.SavingThrow;
import pl.kolendateam.dadcard.skills.entity.ClassSkills;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Prerequisite {

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

    public Prerequisite jsonToPrerequisite(String prerequisite){

        Gson gson = new Gson();
        Prerequisite p = gson.fromJson(prerequisite, Prerequisite.class);

        return new Prerequisite(
            p.getRace(),
            p.getSize(),
            p.getSavingThrow(),
            p.getArmorClass(),
            p.getClassSkills(),
            p.getAbility(),
            p.getSpecialAttacks(),
            p.getBab(),
            p.getSkill(),
            p.getFeats()
        );
    }


}
