package pl.kolendateam.dadcard.spells.entity;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class SpellsTable {

    byte idTable;
    SpellsEnum magicClass;
    SpellsEnum spellsDayKnown;
    String spellsInLevel;

}
