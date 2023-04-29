package pl.kolendateam.dadcard.characterCard.entity;

import java.util.HashMap;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor

public class Vitality {

    int life;
    HashMap <Integer,Integer> hitDices;
    int hitPoints;
    
}
