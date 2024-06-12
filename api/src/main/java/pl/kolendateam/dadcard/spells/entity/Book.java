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
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.classCharacter.entity.EnumClass;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Book implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  @Enumerated(EnumType.STRING)
  EnumClass caster;

  int level;

  @ManyToMany(cascade = CascadeType.MERGE)
  @JoinTable(
    name = "spells_book",
    joinColumns = @JoinColumn(name = "book_id"),
    inverseJoinColumns = @JoinColumn(name = "spells_id")
  )
  List<Spells> spellsBook;

  public Book(int level, EnumClass caster) {
    this.caster = caster;
    this.level = level;
    this.spellsBook = new ArrayList<>();
  }
}
