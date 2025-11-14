package pl.kolendateam.dadcard.spells.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.classCharacter.entity.EnumClass;
import pl.kolendateam.dadcard.spells.MapperSpells;
import pl.kolendateam.dadcard.spells.dto.BookDTO;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
public class Book implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  @Enumerated(EnumType.STRING)
  EnumClass caster;

  @Enumerated(EnumType.STRING)
  SpellsEnum knowDay;

  int level;

  @ManyToMany(cascade = CascadeType.MERGE)
  @JoinTable(
    name = "spells_book",
    joinColumns = @JoinColumn(name = "book_id"),
    inverseJoinColumns = @JoinColumn(name = "spells_id")
  )
  List<Spells> spellsBook;

  @ManyToOne
  @JoinColumn(name = "character_id")
  Character character;

  public Book(int level, EnumClass caster) {
    this.caster = caster;
    this.level = level;
    // this.spellsBook = new HashMap<>();
    this.spellsBook = new ArrayList<>();
  }

  public Book(int charId, BookDTO bookDTO) {
    // this.id = bookDTO.id;
    this.caster = bookDTO.caster;
    this.knowDay = bookDTO.knowDay;
    this.level = bookDTO.level;
    this.spellsBook = MapperSpells.toSpells(bookDTO.spellsBook);
    this.character = new Character(charId);
  }

  public Book(BookDTO dto) {
    // Caster
    this.caster = dto.caster;
    this.knowDay = dto.knowDay;

    // Livello del libro
    this.level = dto.level;

    // Conversione della lista spells dal DTO all’entità Spells
    this.spellsBook = MapperSpells.toSpells(dto.spellsBook);
  }
}
