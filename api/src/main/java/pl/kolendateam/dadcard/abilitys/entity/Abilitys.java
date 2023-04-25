package pl.kolendateam.dadcard.abilitys.entity;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Abilitys implements Serializable{
    
    int streght;
    int streghtBonus;
    int dextrity;
    int dextrityBonus;
    int constitution;
    int constitutionBonus;
    int intelligence;
    int intelligenceBonus;
    int wisdom;
    int wisdomBonus;
    int charisma;
    int charismaBonus;

}
