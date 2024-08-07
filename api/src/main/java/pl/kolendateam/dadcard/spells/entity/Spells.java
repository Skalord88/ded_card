package pl.kolendateam.dadcard.spells.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.spells.MapperSpellsInLevel;

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
  String school;
  String level;
  String components;

  @Enumerated(EnumType.STRING)
  SpellsEnum castingTime;

  @Enumerated(EnumType.STRING)
  SpellsEnum range;

  String effect;
  String duration;
  String area;
  String target;
  String savingThrow;
  String spellResistance;

  String descriptiveText;

  public Integer selectSpellsForClass(SpellsEnum spellClasse, int maxLv) {
    SpellLevel[] spellsOfClass = MapperSpellsInLevel.toSpellLevelArray(
      this.level
    );
    for (SpellLevel levelAndClassFromSpell : spellsOfClass) {
      if (
        levelAndClassFromSpell.getLevel() <= maxLv &&
        levelAndClassFromSpell.getClassDomain() == spellClasse
      ) {
        return this.getId();
      }
    }
    return null;
  }

  public Integer selectSpellByLv(Spells spellToAdd) {
    SpellLevel[] spellsOfClass = MapperSpellsInLevel.toSpellLevelArray(
      this.level
    );
    for (SpellLevel levelAndClassFromSpell : spellsOfClass) {
      return levelAndClassFromSpell.getLevel();
    }
    return null;
  }
}
