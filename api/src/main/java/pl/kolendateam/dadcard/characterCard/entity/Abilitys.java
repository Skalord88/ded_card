package pl.kolendateam.dadcard.characterCard.entity;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Abilitys implements Serializable{
    String streght;
    String dextrity;
    String constitution;
    String intelligence;
    String wisdom;
    String charisma;
}
