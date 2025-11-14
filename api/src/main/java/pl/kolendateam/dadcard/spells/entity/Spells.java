package pl.kolendateam.dadcard.spells.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.spells.dto.SpellsDTO;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class Spells implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  String name;
  String school;
  String subschool;
  String descriptor;

  @JdbcTypeCode(SqlTypes.JSON)
  SpellLevel[] level;

  // String level;
  String components;

  // @Enumerated(EnumType.STRING)
  // SpellsEnum castingTime;
  String castingTime;

  // @Enumerated(EnumType.STRING)
  // SpellsEnum range;
  String range;

  // String effect;
  String duration;
  // String area;
  // String target;
  String targetEffectArea;
  String savingThrow;
  String spellResistance;

  String descriptiveText;
  String materialComponent;
  String focus;
  String xpCost;

  public Spells(SpellsDTO spellDTO) {
    // this.id = spellDTO.id;
    this.name = spellDTO.name;
    this.school = spellDTO.school;
    this.descriptiveText = spellDTO.descriptiveText;
  }
  // public Integer selectSpellsForClass(SpellsEnum spellClasse, int maxLv) {
  //   SpellLevel[] spellsOfClass = MapperSpellsInLevel.toSpellLevelArray(
  //     this.level
  //   );
  //   for (SpellLevel levelAndClassFromSpell : spellsOfClass) {
  //     if (
  //       levelAndClassFromSpell.getLevel() <= maxLv &&
  //       levelAndClassFromSpell.getClassDomain() == spellClasse
  //     ) {
  //       return this.getId();
  //     }
  //   }
  //   return null;
}
//   public Integer selectSpellByLv(Spells spellToAdd) {
//     SpellLevel[] spellsOfClass = MapperSpellsInLevel.toSpellLevelArray(
//       this.level
//     );
//     for (SpellLevel levelAndClassFromSpell : spellsOfClass) {
//       return levelAndClassFromSpell.getLevel();
//     }
//     return null;
//   }
// }
