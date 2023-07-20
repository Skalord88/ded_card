package pl.kolendateam.dadcard.feats.dto;

import java.util.ArrayList;
import java.util.HashMap;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;

@AllArgsConstructor
@NoArgsConstructor
public class PrerequisiteDTO {

    public String race;
    public Abilitys ability;
    public int bab;
    public HashMap<String,Integer> skill;
    public ArrayList<String> feats;
    
}
