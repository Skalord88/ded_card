package pl.kolendateam.dadcard.spells.entity;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.classCharacter.entity.EnumClass;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class SpellsTable implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    byte idTable;

    @Enumerated(EnumType.STRING)
    EnumClass magicClass;

    @Enumerated(EnumType.STRING)
    SpellsEnum spellsDayKnown;

    String spellsInLevel;

}
