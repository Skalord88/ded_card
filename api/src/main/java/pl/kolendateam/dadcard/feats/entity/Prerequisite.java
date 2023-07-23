package pl.kolendateam.dadcard.feats.entity;

import java.io.Serializable;
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

public class Prerequisite implements Serializable{

    String[] race;
    SavingThrow savingThrow;
    ArmorClass armorClass;
    ArrayList<ClassSkills> classSkills;
    Abilitys ability;
    int bab;
    String[] feats;

}
