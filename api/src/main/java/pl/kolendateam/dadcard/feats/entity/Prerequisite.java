package pl.kolendateam.dadcard.feats.entity;

import java.io.Serializable;
import java.util.ArrayList;

import com.google.gson.Gson;

import jakarta.persistence.Converter;
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

public class Prerequisite implements Serializable{

    //String[] race;
    //SavingThrow savingThrow;
    //ArmorClass armorClass;
    //ArrayList<ClassSkills> classSkills;
    //Abilitys ability;
    //int bab;
    String[] feats;

    public Prerequisite jsonToPrerequisite(String prerequisite){

        Gson gson = new Gson();
        Prerequisite p = new Prerequisite();
        Converter container = gson.toJson(prerequisite,Prerequisite.class);
        //Prerequisite p = gson.fromJson(prerequisite, Prerequisite.class);

        // https://stackoverflow.com/questions/2864370/how-do-i-use-googles-gson-api-to-deserialize-json-properly

        return p;

        // crea prerequisito vuoto
        // return new Prerequisite(
        //     p.race,
        //     p.savingThrow,
        //     p.armorClass,
        //     p.classSkills,
        //     p.ability,
        //     p.bab,
        //     p.feats
        //     );
    }

}
