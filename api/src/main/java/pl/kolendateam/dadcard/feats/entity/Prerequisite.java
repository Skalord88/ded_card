package pl.kolendateam.dadcard.feats.entity;

import java.util.ArrayList;

import com.google.gson.Gson;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.armorClass.entity.ArmorClass;
import pl.kolendateam.dadcard.classCharacter.entity.SavingThrow;
import pl.kolendateam.dadcard.skills.entity.ClassSkills;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Prerequisite {

    ArrayList<String> race;
    SavingThrow savingThrow;
    ArmorClass armorClass;
    ArrayList<ClassSkills> classSkills;
    Abilitys ability;
    int bab;
    ArrayList<String> feats;

    public Prerequisite jsonToPrerequisite(String prerequisite){

        Gson gson = new Gson();
        Prerequisite p = gson.fromJson(prerequisite, Prerequisite.class);

        // crea prerequisito vuoto
        return new Prerequisite(
            p.race,
            p.savingThrow,
            p.armorClass,
            p.classSkills,
            p.ability,
            p.bab,
            p.feats
            );
    }


}
