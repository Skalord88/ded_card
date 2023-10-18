package pl.kolendateam.dadcard.spells.entity;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Spells implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    String name;

     @Enumerated(EnumType.STRING)
     SpellsEnum[] school;
    
    String school;
    String level;
    
    // @Enumerated(EnumType.STRING)
    // SpellsEnum[] components;
    
    // @Enumerated(EnumType.STRING)
    // SpellsEnum castingTime;

    // @Enumerated(EnumType.STRING)
    // SpellsEnum range;

    // @Enumerated(EnumType.STRING)
    // SpellsEnum effect;
    
    // String duration;
    
    // @Enumerated(EnumType.STRING)
    // SpellsEnum savingThrow;

    // @Enumerated(EnumType.STRING)
    // SpellsEnum spellResistance;
    
    // @Enumerated(EnumType.STRING)
    // SpellsEnum descriptiveText;

}
