package pl.kolendateam.dadcard.feats.dto;

import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.armorClass.entity.ArmorClass;
import pl.kolendateam.dadcard.classCharacter.entity.SavingThrow;
import pl.kolendateam.dadcard.skills.entity.ClassSkills;

@AllArgsConstructor
@NoArgsConstructor
public class PrerequisiteDTO {

    public ArrayList<String> race;
    public SavingThrow savingThrow;
    public ArmorClass armorClass;
    public ArrayList<ClassSkills> classSkills;
    public Abilitys ability;
    public int bab;
    public ArrayList<String> feats;
    
}
