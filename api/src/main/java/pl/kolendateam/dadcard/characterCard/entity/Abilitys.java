package pl.kolendateam.dadcard.characterCard.entity;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Abilitys implements Serializable{
        
    int streght;
    int dextrity;
    int constitution;
    int intelligence;
    int wisdom;
    int charisma;

}
