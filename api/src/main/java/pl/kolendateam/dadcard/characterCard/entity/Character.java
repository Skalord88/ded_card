package pl.kolendateam.dadcard.characterCard.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
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
import pl.kolendateam.dadcard.abilitys.MapperAbilitys;
import pl.kolendateam.dadcard.abilitys.dto.LevelAbilitysDTO;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.abilitys.entity.LevelAbilitys;
import pl.kolendateam.dadcard.attack.entity.Attacks;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPcToAddDTO;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPc;
import pl.kolendateam.dadcard.feats.dto.FeatPcDTO;
import pl.kolendateam.dadcard.feats.entity.Feat;
import pl.kolendateam.dadcard.feats.entity.FeatPc;
import pl.kolendateam.dadcard.items.dto.ItemDTO;
import pl.kolendateam.dadcard.items.entity.Inventory;
import pl.kolendateam.dadcard.items.entity.Item;
import pl.kolendateam.dadcard.modifier.dto.PrerequisiteDTO;
import pl.kolendateam.dadcard.modifier.dto.PrerequisiteFeatsDTO;
import pl.kolendateam.dadcard.modifier.entity.Prerequisite;
import pl.kolendateam.dadcard.race.dto.AddRegionDTO;
import pl.kolendateam.dadcard.race.entity.Alignment;
import pl.kolendateam.dadcard.race.entity.Archetype;
import pl.kolendateam.dadcard.race.entity.ChoosenRegion;
import pl.kolendateam.dadcard.race.entity.Deity;
import pl.kolendateam.dadcard.race.entity.RacialRegion;
import pl.kolendateam.dadcard.race.entity.SubRace;
import pl.kolendateam.dadcard.skills.dto.SkillToAddDTO;
import pl.kolendateam.dadcard.skills.entity.SkillCharacter;
import pl.kolendateam.dadcard.spells.dto.BookDTO;
import pl.kolendateam.dadcard.spells.dto.SpellsDTO;
import pl.kolendateam.dadcard.spells.entity.Book;
import pl.kolendateam.dadcard.spells.entity.Domains;
import pl.kolendateam.dadcard.spells.entity.Spells;

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

  @JdbcTypeCode(SqlTypes.JSON)
  List<LevelAbilitys> characterLevelAbilitys;

  @OneToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
  @JoinColumn(name = "sub_race_id", referencedColumnName = "id")
  SubRace race;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(
    name = "character_archetypes",
    joinColumns = @JoinColumn(name = "character_card_id"),
    inverseJoinColumns = @JoinColumn(name = "archetype_id")
  )
  Set<Archetype> archetypesList = new HashSet<>();

  @OneToMany(
    mappedBy = "character",
    cascade = CascadeType.ALL,
    orphanRemoval = true,
    fetch = FetchType.LAZY
  )
  List<ClassPc> classPcArray = new ArrayList<>();

  @OneToMany(
    mappedBy = "character",
    cascade = CascadeType.ALL,
    orphanRemoval = true,
    fetch = FetchType.LAZY
  )
  Set<SkillCharacter> skillsCharacter = new HashSet<>();

  @OneToMany(
    mappedBy = "character",
    cascade = CascadeType.ALL,
    orphanRemoval = true,
    fetch = FetchType.LAZY
  )
  List<FeatPc> featsList = new ArrayList<>();

  @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
  @JoinColumn(name = "inventory_id", referencedColumnName = "id")
  Inventory inventory;

  @OneToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
  @JoinColumn(name = "attacks_id", referencedColumnName = "id")
  Attacks attacks;

  @OneToMany(
    mappedBy = "character",
    cascade = CascadeType.ALL,
    orphanRemoval = true,
    fetch = FetchType.LAZY
  )
  List<Book> books = new ArrayList<>();

  @ManyToOne
  @JoinColumn(name = "alignment_id", referencedColumnName = "id")
  Alignment alignment;

  int experience;
  int treasure;

  @ManyToOne
  @JoinColumn(name = "deity_id", referencedColumnName = "id")
  Deity deity;

  @ManyToOne
  @JoinColumn(name = "racial_region_id", referencedColumnName = "id")
  RacialRegion region;

  @ManyToOne
  @JoinColumn(name = "choosen_region_id", referencedColumnName = "id")
  ChoosenRegion choosenRegion;

  @ManyToMany
  @JoinTable(
    name = "character_domains",
    joinColumns = @JoinColumn(name = "character_card_id"),
    inverseJoinColumns = @JoinColumn(name = "domains_id")
  )
  Set<Domains> domains = new HashSet<>();

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

  public boolean buyFeat(Feat feat) {
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
    ArrayList<FeatPcDTO> featsDTOList,
    EntityManager entityManager
  ) {
    if (this.featsList == null) {
      this.featsList = new ArrayList<>();
    }

    Set<FeatPc> newSet = new HashSet<>();

    featsDTOList.forEach(fPc -> {
      Optional<FeatPc> existingOpt =
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

      FeatPc existing;
      if (existingOpt.isPresent()) {
        existing = existingOpt.get(); // Se esiste già, usalo

        if (
          fPc.feat != null &&
          existing.getFeat() != null &&
          fPc.feat.id != existing.getFeat().getId()
        ) {
          // Recupera Feat dal DB invece di crearne uno nuovo
          Feat existingFeat = entityManager.find(Feat.class, fPc.feat.id);
          if (existingFeat != null) {
            existing.setFeat(existingFeat);
          }
        }
      } else {
        existing = new FeatPc(id, fPc); // Crea un nuovo FeatPc se non esiste già
      }

      // Gestione di Prerequisite
      if (fPc.selected != null) {
        Prerequisite prerequisite = (fPc.selected.id != null)
          ? entityManager.find(Prerequisite.class, fPc.selected.id)
          : new Prerequisite();

        if (fPc.selected.feats != null && !fPc.selected.feats.isEmpty()) {
          List<Feat> newFeats = new ArrayList<>();
          for (PrerequisiteFeatsDTO featDTO : fPc.selected.feats) {
            Feat existingFeat = entityManager.find(Feat.class, featDTO.id);
            if (existingFeat != null) {
              newFeats.add(existingFeat);
            }
          }
          prerequisite.setFeats(newFeats);
        } else {
          prerequisite.setFeats(null);
        }

        if (fPc.selected.items != null && !fPc.selected.items.isEmpty()) {
          List<Item> itemsList = new ArrayList<>();
          for (ItemDTO itemDTO : fPc.selected.items) {
            Item existingItem = entityManager.find(Item.class, itemDTO.id);
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

  private boolean hasSameItems(List<Item> list1, List<ItemDTO> list2) {
    if (list1.size() != list2.size()) return false;
    Set<Integer> ids1 = list1
      .stream()
      .map(Item::getId)
      .collect(Collectors.toSet());
    Set<Integer> ids2 = list2
      .stream()
      .map(ItemDTO::getId)
      .collect(Collectors.toSet());
    return ids1.equals(ids2);
  }

  private boolean hasSameFeats(
    List<Feat> list1,
    List<PrerequisiteFeatsDTO> list2
  ) {
    if (list1.size() != list2.size()) return false;
    Set<Integer> ids1 = list1
      .stream()
      .map(Feat::getId)
      .collect(Collectors.toSet());
    Set<Integer> ids2 = list2
      .stream()
      .map(PrerequisiteFeatsDTO::getId)
      .collect(Collectors.toSet());
    return ids1.equals(ids2);
  }

  public void setCharacterBooks(List<BookDTO> spellDTOs, EntityManager em) {
    if (this.books == null) {
      this.books = new ArrayList<>();
    }

    // Indicizza i book esistenti (per evitare duplicati)
    Map<String, Book> existing =
      this.books.stream().collect(Collectors.toMap(this::buildKey, b -> b));

    List<Book> newBooksList = new ArrayList<>();

    // -------------------------------------------------------
    // 1) Estrazione di TUTTI gli ID delle spells richieste
    // -------------------------------------------------------
    Set<Integer> allSpellIds = spellDTOs
      .stream()
      .flatMap(dto -> dto.spellsBook.stream().map(s -> s.id))
      .collect(Collectors.toSet());

    // -------------------------------------------------------
    // 2) Caricamento in UNA sola query
    // -------------------------------------------------------
    Map<Integer, Spells> spellsCache = new HashMap<>();

    if (!allSpellIds.isEmpty()) {
      List<Spells> spells = em
        .createQuery("SELECT s FROM Spells s WHERE s.id IN :ids", Spells.class)
        .setParameter("ids", allSpellIds)
        .getResultList();

      spellsCache =
        spells.stream().collect(Collectors.toMap(s -> s.getId(), s -> s));
    }

    // -------------------------------------------------------
    // 3) Elaborazione Book per Book
    // -------------------------------------------------------
    for (BookDTO dto : spellDTOs) {
      String key = buildKey(dto);
      Book book = existing.get(key);

      // -------------------------------------
      // CASE 1: Book già presente in memoria
      // -------------------------------------
      if (book != null) {
        addSpellsToBook(book, dto, spellsCache);
        newBooksList.add(book);
        continue;
      }

      // -------------------------------------
      // CASE 2: Book esistente nel DB
      // -------------------------------------
      Book dbBook = null;
      if (dto.id != 0) {
        dbBook = em.find(Book.class, dto.id);
      }

      if (dbBook != null) {
        dbBook.setCaster(dto.caster);
        dbBook.setKnowDay(dto.knowDay);
        dbBook.setLevel(dto.level);

        addSpellsToBook(dbBook, dto, spellsCache);
        dbBook.setCharacter(this);

        newBooksList.add(dbBook);
        continue;
      }

      // -------------------------------------
      // CASE 3: Nuovo Book
      // -------------------------------------
      Book newBook = new Book(dto);
      newBook.setCharacter(this);

      addSpellsToBook(newBook, dto, spellsCache);

      newBooksList.add(newBook);
    }

    // aggiorna lista principale
    this.books.clear();
    this.books.addAll(newBooksList);
  }

  private void addSpellsToBook(
    Book book,
    BookDTO dto,
    Map<Integer, Spells> cache
  ) {
    if (book.getSpellsBook() == null) {
      book.setSpellsBook(new ArrayList<>());
    }

    // Aggiunge SOLO le spells già presenti nel DB
    for (SpellsDTO spellDTO : dto.spellsBook) {
      Spells spell = cache.get(spellDTO.id);

      if (spell == null) {
        // Se non esiste nel DB, ignorala completamente
        System.out.println(
          "Spell con id=" + spellDTO.id + " non presente nel DB. Ignorata."
        );
        continue;
      }

      // Aggiunge solo se non è già presente nel book
      if (!book.getSpellsBook().contains(spell)) {
        book.getSpellsBook().add(spell);
      }
    }
  }

  private String buildKey(Book b) {
    String spells = b
      .getSpellsBook()
      .stream()
      .map(s -> String.valueOf(s.getId()))
      .sorted()
      .collect(Collectors.joining("_"));
    return (
      b.getCaster() + "-" + b.getKnowDay() + "-" + b.getLevel() + "-" + spells
    );
  }

  private String buildKey(BookDTO dto) {
    String spells = dto.spellsBook
      .stream()
      .map(s -> String.valueOf(s.id))
      .sorted()
      .collect(Collectors.joining("_"));
    return dto.caster + "-" + dto.knowDay + "-" + dto.level + "-" + spells;
  }

  public void setCharacterRegion(EntityManager em, AddRegionDTO entity) {
    if (entity.idRegion != 0 || this.region.getId() != entity.idRegion) {
      RacialRegion newRegion = em.find(RacialRegion.class, entity.idRegion);

      System.out.println(
        "newRegion: " +
        newRegion.getId() +
        " " +
        newRegion.getRegion().getName()
      );
      this.region = newRegion;
    }
    if (entity.idDeity != 0 || this.deity.getId() != entity.idDeity) {
      // Recupera la nuova deity dal repository
      Deity newDeity = em.find(Deity.class, entity.idDeity);

      System.out.println(
        "newDeity: " + newDeity.getId() + " " + newDeity.getName()
      );
      this.deity = newDeity;

      if (entity.idAligment != 0) {
        Alignment newAlignment = newDeity
          .getWorshiperAlignments()
          .stream()
          .filter(al -> al.getId() == entity.idAligment)
          .findFirst()
          .orElse(null);

        System.out.println(
          "newAlignment: " + newAlignment.getId() + " " + newAlignment.getName()
        );
        this.alignment = newAlignment;
      }
    }

    if ((!entity.idDomains.isEmpty())) {
      checkAndAddDomains(new ArrayList<>(entity.idDomains), em);
    }
  }

  private void checkAndAddDomains(List<Integer> idDomains, EntityManager em) {
    if (
      this.domains.size() == idDomains.size() &&
      this.domains.stream().allMatch(d -> idDomains.contains(d.getId()))
    ) {
      System.out.println("Nessun cambiamento necessario");
      return;
    }
    Set<Domains> newDomains = em
      .createQuery("SELECT d FROM Domains d WHERE d.id IN :ids", Domains.class)
      .setParameter("ids", idDomains)
      .getResultList()
      .stream()
      .collect(Collectors.toSet());

    newDomains.forEach(d ->
      System.out.println("add dominio: " + d.getId() + " " + d.getDomain())
    );
    this.domains = newDomains;
  }

  public void addLevelsAbility(List<LevelAbilitysDTO> levelAbilitis) {
    if (this.characterLevelAbilitys == null) {
      this.characterLevelAbilitys = new ArrayList<>();
    }

    this.characterLevelAbilitys =
      levelAbilitis
        .stream()
        .map(dto -> MapperAbilitys.toLevelAbility(dto))
        .collect(Collectors.toList());
    // for (LevelAbilitysDTO dto : levelAbilitis) {
    //   LevelAbilitys existing =
    //     this.characterLevelAbilitys.stream()
    //       .filter(la -> la.getLevel() == dto.level)
    //       .findFirst()
    //       .orElse(null);

    //   if (existing == null) {
    //     LevelAbilitys newLevelAbility = MapperAbilitys.toLevelAbility(dto);
    //     this.characterLevelAbilitys =
    //       this.characterLevelAbilitys.stream()
    //         .map(la -> {
    //           if (la.getLevel() == newLevelAbility.getLevel()) {
    //             return newLevelAbility;
    //           }
    //           return la;
    //         })
    //         .collect(Collectors.toList());
    //   } else {
    //     if(!existing.getAbilitys().equals(dto.abilitys)) {
    //       existing.setAbilitys(dto.abilitys);
    //       this.characterLevelAbilitys =
    //       this.characterLevelAbilitys.stream()
    //         .map(la -> {
    //           if (la.getLevel() == existing.getLevel()) {
    //             return existing;
    //           }
    //           return la;
    //         })
    //         .collect(Collectors.toList());
    //     }
    //   }
    // }
  }
}
