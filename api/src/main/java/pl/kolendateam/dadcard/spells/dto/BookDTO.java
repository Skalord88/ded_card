package pl.kolendateam.dadcard.spells.dto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.classCharacter.entity.EnumClass;
import pl.kolendateam.dadcard.spells.MapperSpells;
import pl.kolendateam.dadcard.spells.entity.Book;
import pl.kolendateam.dadcard.spells.entity.SpellsEnum;

@NoArgsConstructor
@AllArgsConstructor
public class BookDTO {

  public int id;
  public EnumClass caster;
  public SpellsEnum knowDay;
  public int level;
  public List<SpellsDTO> spellsBook;

  public BookDTO(Book book) {
    this.id = book.getId();
    this.caster = book.getCaster();
    this.knowDay = book.getKnowDay();
    this.level = book.getLevel();
    if (book.getSpellsBook() != null && !book.getSpellsBook().isEmpty()) {
      this.spellsBook = MapperSpells.toSpellsDTO(book.getSpellsBook());
    } else {
      this.spellsBook = new ArrayList<SpellsDTO>();
    }
  }
}
