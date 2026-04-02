package pl.kolendateam.dadcard.spells;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import pl.kolendateam.dadcard.spells.dto.BookDTO;
import pl.kolendateam.dadcard.spells.dto.DomainSpellDTO;
import pl.kolendateam.dadcard.spells.dto.DomainsDTO;
import pl.kolendateam.dadcard.spells.dto.SchoolDTO;
import pl.kolendateam.dadcard.spells.dto.SpellLevelDTO;
import pl.kolendateam.dadcard.spells.dto.SpellsDTO;
import pl.kolendateam.dadcard.spells.entity.Book;
import pl.kolendateam.dadcard.spells.entity.DomainSpell;
import pl.kolendateam.dadcard.spells.entity.Domains;
import pl.kolendateam.dadcard.spells.entity.School;
import pl.kolendateam.dadcard.spells.entity.SpellLevel;
import pl.kolendateam.dadcard.spells.entity.Spells;
import pl.kolendateam.dadcard.spells.entity.SpellsEnum;
import pl.kolendateam.dadcard.spells.repository.SpellsRepository;

public class MapperSpells {

  public static SpellsDTO toSpellsDTO(Spells spell) {
    return new SpellsDTO(spell);
  }

  public static SpellLevelDTO[] toSpellLevelDTOs(SpellLevel[] spellLevels) {
    SpellLevelDTO[] spellLevelDTOs = new SpellLevelDTO[spellLevels.length];
    for (int i = 0; i < spellLevels.length; i++) {
      spellLevelDTOs[i] = new SpellLevelDTO(spellLevels[i]);
    }
    return spellLevelDTOs;
  }

  public static ArrayList<SpellsDTO> toSpellsDTO(List<Spells> spellsList) {
    ArrayList<SpellsDTO> spellsDTOList = new ArrayList<>();
    for (Spells spell : spellsList) {
      SpellsDTO spellDTO = new SpellsDTO(spell);
      spellsDTOList.add(spellDTO);
    }

    return spellsDTOList;
  }

  // public static List<Spells> toSpells(List<SpellsDTO> spellsDTOList) {
  //   List<Spells> spellsList = new ArrayList<>();
  //   for (SpellsDTO spellDTO : spellsDTOList) {
  //     Spells spell = new Spells(spellDTO);
  //     spellsList.add(spell);
  //   }

  //   return spellsList;
  // }

  public static Set<SpellsDTO> toSpellsDTOSet(Set<Spells> spellsList) {
    Set<SpellsDTO> spellsDTOList = new HashSet<>();
    spellsList.forEach(s -> {
      if (s != null) {
        spellsDTOList.add(new SpellsDTO(s));
      }
    });
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

  // public static Set<DomainsDTO> toDomainsDTOSet(
  //   Set<Domains> domanins,
  //   SpellsRepository spellsRepository
  // ) {
  //   Set<DomainsDTO> domainsDTOSet = new HashSet<>();
  //   if (domanins == null) {
  //     return new HashSet<>();
  //   } else {
  //     domanins.forEach(d -> {
  //       if (d != null) {
  //         domainsDTOSet.add(new DomainsDTO(d, spellsRepository));
  //       }
  //     });
  //   }
  //   return domainsDTOSet;
  // }

  public static Set<DomainsDTO> toDomainsDTOSet(Set<Domains> domanins) {
    Set<DomainsDTO> domainsDTOSet = new HashSet<>();
    if (domanins == null) {
      return new HashSet<>();
    } else {
      domanins.forEach(d -> {
        if (d != null) {
          domainsDTOSet.add(new DomainsDTO(d));
        }
      });
    }
    return domainsDTOSet;
  }

  // public static List<SpellsDTO> toClassSpellsDTO(
  //   List<Spells> spellsList,
  //   SpellsEnum className
  // ) {
  //   ArrayList<SpellsDTO> spellsDTOList = new ArrayList<>();
  //   for (Spells spell : spellsList) {
  //     SpellLevel[] listLevels = MapperSpellsInLevel.toSpellLevelArray(
  //       spell.getLevel()
  //     );

  //     for (SpellLevel sp : listLevels) {
  //       if (sp.getClassDomain() == className) {
  //         SpellsDTO spellDTO = new SpellsDTO(spell);
  //         spellsDTOList.add(spellDTO);
  //       }
  //     }
  //   }

  //   return spellsDTOList;
  // }

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

  public static List<SchoolDTO> toSchoolListDTO(List<School> schools) {
    if (schools == null || schools.isEmpty()) {
      return null;
    }
    List<SchoolDTO> schoolsDTO = new ArrayList<>();

    if (schools != null) {
      for (School sc : schools) {
        schoolsDTO.add(new SchoolDTO(sc));
      }
    }
    return schoolsDTO;
  }

  public static List<School> toSchoolList(List<SchoolDTO> schoolsDTO) {
    List<School> schools = new ArrayList<>();
    if (schoolsDTO != null) {
      schoolsDTO.forEach(schoolDTO -> {
        schools.add(new School(schoolDTO));
      });
    }
    return schools;
  }

  public static Set<DomainSpellDTO> toDomainSpellDTOSet(
    Map<Integer, Integer> domainSpells,
    SpellsRepository spellsRepository
  ) {
    Set<DomainSpellDTO> domainSpellDTOs = new HashSet<>();

    if (domainSpells == null || domainSpells.isEmpty()) {
      return domainSpellDTOs;
    }

    // Recupero tutte le spell in un'unica query
    List<Spells> spells = spellsRepository.findByIdIn(
      new ArrayList<>(domainSpells.values())
    );

    // Creo una mappa id -> spell per accesso rapido
    Map<Integer, Spells> spellsMap = spells
      .stream()
      .collect(Collectors.toMap(Spells::getId, s -> s));

    // Creo i DTO
    for (Map.Entry<Integer, Integer> entry : domainSpells.entrySet()) {
      Integer spellId = entry.getValue();
      Integer domainLevel = entry.getKey();

      Spells spell = spellsMap.get(spellId);
      if (spell != null) {
        domainSpellDTOs.add(new DomainSpellDTO(spell, domainLevel));
      }
    }

    return domainSpellDTOs;
  }

  public static DomainsDTO toDomainDTO(Domains domain) {
    if (domain == null) {
      return null;
    } else {
      return new DomainsDTO(domain);
    }
  }

  public static Set<DomainSpellDTO> toDomainSpellDTOSet(
    Set<DomainSpell> domainSpells
  ) {
    Set<DomainSpellDTO> domainSpellDTOs = new HashSet<>();

    if (domainSpells == null || domainSpells.isEmpty()) {
      return domainSpellDTOs;
    }

    domainSpells.forEach(ds -> {
      if (ds != null) {
        domainSpellDTOs.add(new DomainSpellDTO(ds));
      }
    });

    return domainSpellDTOs;
  }
}
