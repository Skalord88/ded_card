package pl.kolendateam.dadcard.feats.entity;

import java.util.ArrayList;
import java.util.HashMap;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Prerequisite {

    String race;
    Abilitys ability;
    int bab;
    HashMap<String,Integer> skill;
    ArrayList<String> feats;    
    
}
