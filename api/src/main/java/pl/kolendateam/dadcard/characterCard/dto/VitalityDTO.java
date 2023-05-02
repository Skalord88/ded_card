package pl.kolendateam.dadcard.characterCard.dto;

import java.util.HashMap;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class VitalityDTO {

    public int life;
    public HashMap <Integer,Integer> hitDices;
    public int hitPoints;
    
}
