package pl.kolendateam.dadcard.characterCard.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityManager;
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
import java.util.Optional;
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
import pl.kolendateam.dadcard.feats.dto.PrerequisiteDTO;
import pl.kolendateam.dadcard.feats.dto.PrerequisiteFeatsDTO;
import pl.kolendateam.dadcard.feats.entity.Feats;
import pl.kolendateam.dadcard.feats.entity.FeatsPc;
import pl.kolendateam.dadcard.feats.entity.Prerequisite;
import pl.kolendateam.dadcard.items.dto.ItemsDTO;
import pl.kolendateam.dadcard.items.entity.Inventory;
import pl.kolendateam.dadcard.items.entity.Items;
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

  public void addFeatsToCharacter(
    int id,
    ArrayList<FeatsPcDTO> featsDTOList,
    EntityManager entityManager
  ) {
    if (this.featsList == null) {
      this.featsList = new ArrayList<>();
    }

    Set<FeatsPc> newSet = new HashSet<>();

    featsDTOList.forEach(fPc -> {
      Optional<FeatsPc> existingOpt =
        this.featsList.stream()
          .filter(feat ->
            (
              feat.getLevel() != null &&
              feat.getLevel() == fPc.level &&
              feat.getClassFeat() == null
            ) ||
            (
              feat.getClassFeat() != null &&
              fPc.classFeat != null &&
              feat.getClassFeat().getId() == fPc.classFeat.id
            )
          )
          .findFirst();

      FeatsPc existing;
      if (existingOpt.isPresent()) {
        existing = existingOpt.get(); // Se esiste già, usalo

        if (
          fPc.feat != null &&
          existing.getFeat() != null &&
          fPc.feat.id != existing.getFeat().getId()
        ) {
          // Recupera Feats dal DB invece di crearne uno nuovo
          Feats existingFeat = entityManager.find(Feats.class, fPc.feat.id);
          if (existingFeat != null) {
            existing.setFeat(existingFeat);
          }
        }
      } else {
        existing = new FeatsPc(id, fPc); // Crea un nuovo FeatsPc se non esiste già
      }

      // Gestione di Prerequisite
      if (fPc.selected != null) {
        Prerequisite prerequisite = (fPc.selected.id != null)
          ? entityManager.find(Prerequisite.class, fPc.selected.id)
          : new Prerequisite();

        if (fPc.selected.feats != null && !fPc.selected.feats.isEmpty()) {
          List<Feats> newFeats = new ArrayList<>();
          for (PrerequisiteFeatsDTO featDTO : fPc.selected.feats) {
            Feats existingFeat = entityManager.find(Feats.class, featDTO.id);
            if (existingFeat != null) {
              newFeats.add(existingFeat);
            }
          }
          prerequisite.setFeats(newFeats);
        } else {
          prerequisite.setFeats(null);
        }

        if (fPc.selected.items != null && !fPc.selected.items.isEmpty()) {
          List<Items> itemsList = new ArrayList<>();
          for (ItemsDTO itemDTO : fPc.selected.items) {
            Items existingItem = entityManager.find(Items.class, itemDTO.id);
            if (existingItem != null) {
              itemsList.add(existingItem);
            }
          }
          prerequisite.setItems(itemsList);
        } else {
          prerequisite.setItems(null);
        }

        existing.setSelected(prerequisite);
      }

      System.out.println("existing: " + existing);
      newSet.add(existing);
    });

    this.featsList.clear();
    this.featsList.addAll(newSet);
  }

  private boolean prerequisiteEquals(Prerequisite p, PrerequisiteDTO dto) {
    return (
      // Arrays.equals(
      // p.getFeatType(), dto.featType) &&
      hasSameItems(p.getItems(), dto.items) &&
      hasSameFeats(p.getFeats(), dto.feats)
    );
  }

  private boolean hasSameItems(List<Items> list1, List<ItemsDTO> list2) {
    if (list1.size() != list2.size()) return false;
    Set<Integer> ids1 = list1
      .stream()
      .map(Items::getId)
      .collect(Collectors.toSet());
    Set<Integer> ids2 = list2
      .stream()
      .map(ItemsDTO::getId)
      .collect(Collectors.toSet());
    return ids1.equals(ids2);
  }

  private boolean hasSameFeats(
    List<Feats> list1,
    List<PrerequisiteFeatsDTO> list2
  ) {
    if (list1.size() != list2.size()) return false;
    Set<Integer> ids1 = list1
      .stream()
      .map(Feats::getId)
      .collect(Collectors.toSet());
    Set<Integer> ids2 = list2
      .stream()
      .map(PrerequisiteFeatsDTO::getId)
      .collect(Collectors.toSet());
    return ids1.equals(ids2);
  }
}
