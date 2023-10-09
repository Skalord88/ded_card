package pl.kolendateam.dadcard.spells;

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
public class Spells {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    String name;
    SpellsEnum[] school;
    SpellsEnum[] level;
    SpellsEnum[] components;
    SpellsEnum castingTime;
    SpellsEnum range;
    SpellsEnum effect;
    SpellsEnum duration;
    SpellsEnum savingThrow;
    SpellsEnum spellResistance;
    SpellsEnum descriptiveText;

}
