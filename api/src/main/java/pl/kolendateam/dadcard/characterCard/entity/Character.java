package pl.kolendateam.dadcard.characterCard.entity;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.abilitys.entity.AbilityEnum;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.attack.entity.Attacks;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPc;
import pl.kolendateam.dadcard.classCharacter.entity.Dices;
import pl.kolendateam.dadcard.classCharacter.entity.DicesEnum;
import pl.kolendateam.dadcard.classCharacter.entity.EnumClass;
import pl.kolendateam.dadcard.feats.entity.Feats;
import pl.kolendateam.dadcard.feats.entity.FeatsPc;
import pl.kolendateam.dadcard.items.entity.Inventory;
import pl.kolendateam.dadcard.race.entity.Archetype;
import pl.kolendateam.dadcard.race.entity.SubRace;
import pl.kolendateam.dadcard.skills.dto.SkillToAddDTO;
import pl.kolendateam.dadcard.skills.dto.StudyDTO;
import pl.kolendateam.dadcard.skills.entity.ClassSkills;
import pl.kolendateam.dadcard.skills.entity.ClassStudy;
import pl.kolendateam.dadcard.skills.entity.Skills;
import pl.kolendateam.dadcard.skills.entity.Study;
import pl.kolendateam.dadcard.spells.MapperSpellsInLevel;
import pl.kolendateam.dadcard.spells.entity.Book;
import pl.kolendateam.dadcard.spells.entity.SpellsEnum;
import pl.kolendateam.dadcard.spells.entity.SpellsInLevel;
import pl.kolendateam.dadcard.spells.entity.SpellsTable;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "character_card")
public class Character implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public int id;

  String characterName;

  String playerName;

  @JdbcTypeCode(SqlTypes.JSON)
  Abilitys abilitys;

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "sub_race_id", referencedColumnName = "id")
  SubRace race;

  @ManyToMany
  @JoinTable(
    name = "character_archetypes",
    joinColumns = @JoinColumn(name = "character_card_id"),
    inverseJoinColumns = @JoinColumn(name = "archetype_id")
  )
  Set<Archetype> archetypesList = new HashSet<>();

  @OneToMany(
    mappedBy = "character",
    cascade = CascadeType.ALL,
    orphanRemoval = true
  )
  List<ClassPc> classPcArray;

  @JdbcTypeCode(SqlTypes.JSON)
  ArrayList<ClassSkills> classSkills;

  @OneToMany(
    mappedBy = "character",
    cascade = CascadeType.ALL,
    orphanRemoval = true
  )
  List<FeatsPc> featsList;

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "inventory_id", referencedColumnName = "id")
  Inventory inventory;

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "attacks_id", referencedColumnName = "id")
  Attacks attacks;

  @JdbcTypeCode(SqlTypes.JSON)
  HashMap<EnumClass, Integer[]> magicPerDay;

  @JdbcTypeCode(SqlTypes.JSON)
  HashMap<EnumClass, Integer[]> magicKnown;

  @OneToMany(cascade = CascadeType.MERGE)
  @JoinColumn(name = "character_id", referencedColumnName = "id")
  List<Book> books;

  int experience;
  int treasure;

  public Character(String characterName, String playerName) {
    this.characterName = characterName;
    this.playerName = playerName;
    this.abilitys = new Abilitys();
    this.race = null;
    this.classPcArray = new ArrayList<>();
    this.classSkills = new ArrayList<>();
    this.featsList = new ArrayList<>();
    this.inventory = new Inventory();
    this.attacks = new Attacks();
    this.magicPerDay = new HashMap<>();
    this.magicKnown = new HashMap<>();
    this.books = new ArrayList<>();
  }

  public void addClassToPcArray(ClassPc classPc) {
    this.classPcArray.add(classPc);
  }

  public void removeClassFromPcArray(int index) {
    this.getClassPcArray().remove(index);
  }

  public void incrementLevelClassForIndex(int index) {
    this.getClassPcArray().get(index).incrementLevel();
  }

  public void decrementLevelClassForIndex(int index) {
    this.getClassPcArray().get(index).decrementLevel();
  }

  public void setSkillsTruePcArray(Set<Skills> availableSkills) {
    for (Skills skill : availableSkills) {
      for (ClassSkills classSkill : classSkills) {
        if (skill.getId() == classSkill.getIdSkill()) {
          classSkill.setClassSkill(true);
        }
      }
    }
  }

  public void createSkillsArray(List<Skills> skillsList) {
    boolean check = true;
    if (classSkills.isEmpty()) {
      check = false;
    }
    if (check == false) {
      for (Skills skillDB : skillsList) {
        ClassSkills skill = new ClassSkills();

        skill.setIdSkill(skillDB.getId());
        skill.setNameSkill(skillDB.getName());
        HashSet<ClassStudy> studyField = new HashSet<>();
        skill.setFieldOfStudy(studyField);
        skill.setClassSkill(false);
        skill.setSkillRank(0);
        AbilityEnum ability = skillDB.getAbility();
        switch (ability) {
          case STRENGHT:
            skill.setSkillAbility(ability);
            break;
          case DEXTERITY:
            skill.setSkillAbility(ability);
            break;
          case CONSTITUTION:
            skill.setSkillAbility(ability);
            break;
          case INTELLIGENCE:
            skill.setSkillAbility(ability);
            break;
          case WISDOM:
            skill.setSkillAbility(ability);
            break;
          case CHARISMA:
            skill.setSkillAbility(ability);
            break;
        }
        this.classSkills.add(skill);
      }
    }
  }

  public void setCharacterRace(SubRace subRace) {
    this.race = subRace;
  }

  public void addSkill(String skills) {
    Gson gson = new Gson();

    Type listSkill = new TypeToken<List<ClassSkills>>() {}.getType();
    List<ClassSkills> skill = gson.fromJson(skills, listSkill);

    for (ClassSkills clSk : classSkills) {
      for (ClassSkills sk : skill) {
        if (clSk.getNameSkill().equals(sk.getNameSkill())) {
          clSk.setSkillBonus(clSk.getSkillBonus() + (int) sk.getSkillRank());
        }
      }
    }
  }

  public void addAbilityRace(String raceAbilitys) {
    Gson gson = new Gson();
    Abilitys jsonObjectAbilitys = gson.fromJson(raceAbilitys, Abilitys.class);

    this.abilitys.addRaceAbilitys(jsonObjectAbilitys, abilitys);
  }

  public boolean buyFeat(Feats feat) {
    boolean buyed = false;

    // if (feat.getFeatsType() == FeatsTypeEnum.CLASS) {
    //   return false;
    // }

    // CharacterFeat characterFeat = new CharacterFeat(
    //   feat.getId(),
    //   1,
    //   feat.getFeatName(),
    //   feat.getDescription(),
    //   feat.getFeatsType()
    // );

    // ArrayList<CharacterFeat> allFeats = new ArrayList<>();

    // boolean featPresent = false;
    // for (CharacterFeat cF : allFeats) {
    //   if (
    //     cF.getCharacterFeatName().equals(characterFeat.getCharacterFeatName())
    //   ) {
    //     featPresent = true;
    //   }
    // }

    return buyed;
  }

  public void allSkillsFalse() {
    for (ClassSkills cS : classSkills) {
      cS.setClassSkill(false);
    }
  }

  public void addStudyToCharacter(Set<Study> availableStudy) {
    for (ClassSkills clSk : this.classSkills) {
      for (Study st : availableStudy) {
        if (clSk.getIdSkill() == st.getIdSkill()) {
          clSk.addStudyToFieldOfStudy(st);
        }
      }
    }
  }

  public void removeStudyFromCharacter(Set<Study> availableStudy) {
    this.classSkills.forEach(skill -> {
        if (!skill.getFieldOfStudy().isEmpty()) {
          skill
            .getFieldOfStudy()
            .forEach(study -> {
              if (study.getId() == skill.getIdSkill()) {
                skill.removeStudyFromKnowledge(study.getId());
              }
            });
        }
      });
  }

  public void allKnowledgeZero() {
    for (ClassSkills cS : classSkills) {
      if (!cS.getFieldOfStudy().isEmpty()) {
        HashSet<ClassStudy> emptyKnow = new HashSet<>();
        cS.setFieldOfStudy(emptyKnow);
      }
    }
  }

  public void addMagic(
    List<SpellsTable> spellsTableList,
    SpellsEnum spellDay,
    SpellsEnum spellKnown
  ) {
    for (SpellsTable table : spellsTableList) {
      ArrayList<SpellsInLevel> spellsInLevelFromDB = MapperSpellsInLevel.toSpellsInLevel(
        table.getSpellsInLevel()
      );
      if (table.getSpellsDayKnown() != null) {
        for (ClassPc classPc : this.classPcArray) {
          if (
            table.getSpellsDayKnown() == SpellsEnum.DAY &&
            table.getMagicClass() ==
            classPc.getClassCharacter().getSpellsPerDay()
          ) {
            for (SpellsInLevel spellsInThisLevel : spellsInLevelFromDB) {
              if (classPc.getLevel() == spellsInThisLevel.getLevel()) {
                this.magicPerDay.put(
                    classPc.getClassCharacter().getName(),
                    spellsInThisLevel.getSpells()
                  );
              }
            }
          }

          if (
            table.getSpellsDayKnown() == SpellsEnum.KNOWN &&
            table.getMagicClass() ==
            classPc.getClassCharacter().getSpellsKnown()
          ) {
            for (SpellsInLevel spellsInThisLevel : spellsInLevelFromDB) {
              if (classPc.getLevel() == spellsInThisLevel.getLevel()) {
                this.magicKnown.put(
                    classPc.getClassCharacter().getName(),
                    spellsInThisLevel.getSpells()
                  );
              }
            }
          }
        }
      }
    }
  }

  public EnumClass characterGetClassEnumById(int idClass) {
    for (ClassPc clPc : this.classPcArray) {
      if (idClass == clPc.getClassCharacter().getId()) {
        return clPc.getClassCharacter().getName();
      }
    }
    return null;
  }

  public SpellsEnum characterGetSpellClassById(int idClass) {
    for (ClassPc clPc : this.classPcArray) {
      if (idClass == clPc.getClassCharacter().getId()) {
        return clPc.getClassCharacter().getSpellsDomain();
      }
    }
    return null;
  }

  public boolean getClassSpellsKnown(EnumClass className) {
    for (Book book : this.books) {
      if (book.getCaster() == className) {
        return book.getCaster() == className;
      }
    }
    return false;
  }

  public boolean magicClass(SpellsEnum spellsPerDay) {
    if (spellsPerDay == null) {
      return false;
    }
    return true;
  }

  public void buySkills(SkillToAddDTO skillsToAddDTO) {
    skillsToAddDTO.skillDTO.forEach(skillDTO -> {
      this.classSkills.forEach(skill -> {
          if (skillDTO.fieldOfStudy.size() > 0) {
            skillDTO.fieldOfStudy.forEach(study -> {
              if (study.idSkill == skill.getIdSkill()) {
                skill.addRankStudy(study);
              }
            });
          } else {
            if (skill.getIdSkill() == skillDTO.idSkill) {
              skill.addRankSkill(skillDTO.skillRank);
            }
          }
        });
    });
  }

  public void zeroSkillsRank() {
    for (ClassSkills classSkill : this.classSkills) {
      classSkill.setSkillRank(0);
      if (!classSkill.getFieldOfStudy().isEmpty()) {
        classSkill.zeroStudyRank();
      }
    }
  }

  public void addStudy(ArrayList<StudyDTO> studyToAdd) {
    for (StudyDTO studyDTO : studyToAdd) {
      for (ClassSkills skill : this.classSkills) {
        if (studyDTO.idSkill == skill.getIdSkill()) {
          skill
            .getFieldOfStudy()
            .forEach(study -> {
              if (studyDTO.idStudy == study.getId()) {
                study.setRank(studyDTO.rank);
              }
            });
        }
      }
    }
  }

  public void setFirstLevelGold(String initialGold) {
    Gson gson = new Gson();
    Type arrayGold = new TypeToken<String[]>() {}.getType();
    String[] diceGold = gson.fromJson(initialGold, arrayGold);

    int number = Integer.parseInt(diceGold[0]);
    DicesEnum diceTyp = DicesEnum.valueOf(diceGold[1]);
    int multiply = Integer.parseInt(diceGold[2]);

    Dices d = new Dices();

    int resGold = d.throwDices(number, diceTyp);

    this.treasure = resGold * multiply;
  }

  public void setZeroExp() {
    this.experience = 0;
  }

  public void emptyInventory() {
    this.inventory = new Inventory();
  }

  public void addSpellKnown(int sizeMagic, @NonNull EnumClass name) {
    boolean present = false;
    for (Book charBook : this.books) {
      if (charBook.getCaster() == name && charBook.getLevel() == sizeMagic) {
        present = true;
      }
    }
    if (!present) {
      Book book = new Book(sizeMagic, name);
      this.books.add(book);
    }
  }

  public void addNewSpellsKnown(int sizeMagic, @NonNull EnumClass name) {
    for (int i = 0; i < sizeMagic; i++) {
      Book book = new Book(i, name);
      this.books.add(book);
    }
  }

  public int getSizeMagic(@NonNull EnumClass name) {
    if (this.magicKnown.get(name) != null) {
      return this.magicKnown.get(name).length;
    }
    return -1;
  }

  public void removePerDayKnow(@NonNull EnumClass name) {
    this.magicPerDay.remove(name);
    this.magicKnown.remove(name);
  }

  public void removeBook(@NonNull EnumClass name) {
    for (int i = 0; i < this.books.size(); i++) {
      if (name == this.books.get(i).getCaster()) {
        this.books.remove(i);
        i--;
      }
    }
  }

  public void decrementBooks(int sizeMagic, @NonNull EnumClass name) {
    for (int i = 0; i < this.books.size(); i++) {
      if (
        this.books.get(i).getCaster() == name &&
        this.books.get(i).getLevel() == sizeMagic
      ) {
        this.books.remove(i);
        i--;
      }
    }
  }

  public int findLevelInClassesById(int id) {
    for (ClassPc classPc : classPcArray) {
      if (classPc.getClassCharacter().getId() == id) {
        return classPc.getLevel();
      }
    }
    return -1;
  }
}
