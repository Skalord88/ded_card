package pl.kolendateam.dadcard.spells.dto;

import java.util.ArrayList;
import java.util.List;
import pl.kolendateam.dadcard.classCharacter.entity.EnumClass;
import pl.kolendateam.dadcard.spells.MapperSpellsDTO;
import pl.kolendateam.dadcard.spells.entity.Book;

public class BookDTO {

  public EnumClass caster;
  public int level;
  public List<SpellsDTO> spells;

  public BookDTO(Book book) {
    this.caster = book.getCaster();
    this.level = book.getLevel();
    if (book.getSpellsBook() != null && !book.getSpellsBook().isEmpty()) {
      this.spells = MapperSpellsDTO.toSpellsDTO(book.getSpellsBook());
    } else {
      this.spells = new ArrayList<SpellsDTO>();
    }
  }
}
