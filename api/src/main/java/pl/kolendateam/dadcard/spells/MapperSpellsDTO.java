package pl.kolendateam.dadcard.spells;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import pl.kolendateam.dadcard.spells.dto.BookDTO;
import pl.kolendateam.dadcard.spells.dto.SpellsDTO;
import pl.kolendateam.dadcard.spells.entity.Book;
import pl.kolendateam.dadcard.spells.entity.SpellLevel;
import pl.kolendateam.dadcard.spells.entity.Spells;
import pl.kolendateam.dadcard.spells.entity.SpellsEnum;

public class MapperSpellsDTO {

  public static ArrayList<SpellsDTO> toSpellsDTO(List<Spells> spellsList) {
    ArrayList<SpellsDTO> spellsDTOList = new ArrayList<>();
    for (Spells spell : spellsList) {
      SpellsDTO spellDTO = new SpellsDTO(spell);
      spellsDTOList.add(spellDTO);
    }

    return spellsDTOList;
  }

  public static SpellsEnum[] toSpellEnumArray(String enumSpell) {
    Gson gson = new Gson();
    Type enumSpellArrayJson = new TypeToken<SpellsEnum[]>() {}.getType();
    SpellsEnum[] enumSpellArray = gson.fromJson(enumSpell, enumSpellArrayJson);

    return enumSpellArray;
  }

  public static SpellLevel[] toSpellLevelArray(String enumSpell) {
    Gson gson = new Gson();
    Type enumSpellArrayJson = new TypeToken<SpellLevel[]>() {}.getType();
    SpellLevel[] levelSpellArray = gson.fromJson(enumSpell, enumSpellArrayJson);

    return levelSpellArray;
  }

  public static List<SpellsDTO> toClassSpellsDTO(
    List<Spells> spellsList,
    SpellsEnum className
  ) {
    ArrayList<SpellsDTO> spellsDTOList = new ArrayList<>();
    for (Spells spell : spellsList) {
      SpellLevel[] listLevels = MapperSpellsInLevel.toSpellLevelArray(
        spell.getLevel()
      );

      for (SpellLevel sp : listLevels) {
        if (sp.getClassDomain() == className) {
          SpellsDTO spellDTO = new SpellsDTO(spell);
          spellsDTOList.add(spellDTO);
        }
      }
    }

    return spellsDTOList;
  }

  public static BookDTO toBookDTO(Book book) {
    return new BookDTO(book);
  }

  public static ArrayList<BookDTO> toBooksDTO(List<Book> books) {
    ArrayList<BookDTO> booksDTO = new ArrayList<>();

    if (books != null) {
      for (Book book : books) {
        booksDTO.add(new BookDTO(book));
      }
    }
    return booksDTO;
  }
}
