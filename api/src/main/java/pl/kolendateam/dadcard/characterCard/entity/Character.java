package pl.kolendateam.dadcard.characterCard.entity;

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
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.attack.entity.Attacks;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPcToAddDTO;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPc;
import pl.kolendateam.dadcard.feats.dto.FeatsPcDTO;
import pl.kolendateam.dadcard.feats.entity.Feats;
import pl.kolendateam.dadcard.feats.entity.FeatsPc;
import pl.kolendateam.dadcard.items.entity.Inventory;
import pl.kolendateam.dadcard.race.entity.Archetype;
import pl.kolendateam.dadcard.race.entity.SubRace;
import pl.kolendateam.dadcard.skills.dto.SkillToAddDTO;
import pl.kolendateam.dadcard.skills.entity.SkillCharacter;
import pl.kolendateam.dadcard.spells.entity.Book;

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
  List<ClassPc> classPcArray = new ArrayList<>();

  @OneToMany(
    mappedBy = "character",
    cascade = CascadeType.ALL,
    orphanRemoval = true
  )
  Set<SkillCharacter> skillsCharacter = new HashSet<>();

  @OneToMany(
    mappedBy = "character",
    cascade = CascadeType.ALL,
    orphanRemoval = true
  )
  List<FeatsPc> featsList = new ArrayList<>();

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "inventory_id", referencedColumnName = "id")
  Inventory inventory;

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "attacks_id", referencedColumnName = "id")
  Attacks attacks;

  @OneToMany(cascade = CascadeType.MERGE)
  @JoinColumn(name = "character_id", referencedColumnName = "id")
  List<Book> books = new ArrayList<>();

  int experience;
  int treasure;

  public Character(String characterName, String playerName) {
    this.characterName = characterName;
    this.playerName = playerName;
  }

  public Character(int charId) {
    this.id = charId;
  }

  public void setCharacterRace(SubRace subRace) {
    this.race = subRace;
  }

  public boolean buyFeat(Feats feat) {
    boolean buyed = false;

    return buyed;
  }

  public void setNewClassPcArrayFromDTO(
    List<ClassPcToAddDTO> listOfClassDTO,
    int charId
  ) {
    if (this.classPcArray == null) {
      this.classPcArray = new ArrayList<>();
    }

    // Crea una mappa degli elementi esistenti di ClassPc basandosi sui loro ID
    Map<Integer, ClassPc> existingClassPcMap =
      this.classPcArray.stream()
        .collect(
          Collectors.toMap(
            classPc -> classPc.getClassCharacter().getId(),
            classPc -> classPc
          )
        );

    // Prepara il nuovo elenco
    List<ClassPc> updatedList = new ArrayList<>();

    for (ClassPcToAddDTO dto : listOfClassDTO) {
      if (dto.id != 0 && existingClassPcMap.containsKey(dto.id)) {
        // Aggiorna l'entità esistente
        ClassPc existing = existingClassPcMap.get(dto.id);
        existing.setLevel(dto.level);
        existing.setFirstClass(dto.firstClass);
        updatedList.add(existing);
      } else {
        // Aggiungi una nuova entità
        ClassPc newClassPc = new ClassPc(
          dto.level,
          dto.firstClass,
          dto.id,
          charId
        );
        updatedList.add(newClassPc);
      }
    }

    // Pulisci e aggiorna la collezione esistente
    this.classPcArray.clear();
    this.classPcArray.addAll(updatedList);
  }

  public void buySkills(List<SkillToAddDTO> skillsToAdd, int charId) {
    if (this.skillsCharacter == null) {
      this.skillsCharacter = new HashSet<>();
    }

    // Mappa per cercare rapidamente skill e study già presenti
    Map<Integer, SkillCharacter> existingSkillMap =
      this.skillsCharacter.stream()
        .filter(sc -> sc.getSkill() != null)
        .collect(Collectors.toMap(sc -> sc.getSkill().getId(), sc -> sc));

    Map<Integer, SkillCharacter> existingStudyMap =
      this.skillsCharacter.stream()
        .filter(sc -> sc.getStudy() != null)
        .collect(Collectors.toMap(sc -> sc.getStudy().getId(), sc -> sc));

    Set<SkillCharacter> updatedList = new HashSet<>();

    for (SkillToAddDTO dto : skillsToAdd) {
      SkillCharacter existing = null;

      // Controlla se la skill esiste già
      if (dto.idSkill != 0) {
        existing = existingSkillMap.get(dto.idSkill);
      } else if (dto.idStudy != 0) {
        existing = existingStudyMap.get(dto.idStudy);
      }

      if (existing != null) {
        // Aggiorna il rank della skill esistente
        existing.setRank(dto.rank);
      } else {
        // Crea una nuova SkillCharacter e aggiungila
        existing = new SkillCharacter(dto, charId);
      }

      updatedList.add(existing);
    }

    // Aggiorna l'insieme
    this.skillsCharacter.clear();
    this.skillsCharacter.addAll(updatedList);
  }

  public void addFeatsToCharacter(int id, ArrayList<FeatsPcDTO> featsDTOList) {
    if (this.featsList == null) {
      this.featsList = new ArrayList<>();
    }

    List<FeatsPc> newList = new ArrayList<>();
    featsDTOList.forEach(fDTO -> {
      FeatsPc existing = null;
      boolean exist = false;
      if (fDTO.typeOfFeatsPcDTO() == 1) {
        for (int i = 0; i < this.featsList.size(); i++) {
          if (
            this.featsList.get(i).getFeat().getId() == fDTO.feat.id &&
            this.featsList.get(i).getLevel() == fDTO.level
          ) {
            existing = this.featsList.get(i);
            exist = true;
          }
        }
        if (!exist) {
          existing = new FeatsPc(id, fDTO.level, fDTO.feat, fDTO.selected);
        }
        newList.add(existing);
      }
      if (fDTO.typeOfFeatsPcDTO() == 2) {
        for (int i = 0; i < this.featsList.size(); i++) {
          if (
            this.featsList.get(i).getFeat().getId() == fDTO.feat.id &&
            this.featsList.get(i).getClassFeat().getId() == fDTO.classFeat.id &&
            this.featsList.get(i).getLevel() == fDTO.level
          ) {
            existing = this.featsList.get(i);
            exist = true;
          }
        }
        if (!exist) {
          existing = new FeatsPc(id, fDTO);
        }
        newList.add(existing);
      }
    });

    this.featsList.clear();
    this.featsList.addAll(newList);
  }
}
