package pl.kolendateam.dadcard.classCharacter.entity;

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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.feats.entity.ClassFeat;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;
import pl.kolendateam.dadcard.skills.entity.Skill;
import pl.kolendateam.dadcard.skills.entity.Study;
import pl.kolendateam.dadcard.spells.entity.SpellsEnum;
import pl.kolendateam.dadcard.spells.entity.SpellsTable;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "class_character")
public class ClassCharacter implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  @Enumerated(EnumType.STRING)
  ClassTypeEnum classType;

  @Enumerated(EnumType.STRING)
  EnumClass name;

  String avatarUrl;

  byte hitDice;

  String savingThrow;

  double classBab;

  @ManyToMany
  @JoinTable(
    name = "class_skills",
    joinColumns = @JoinColumn(name = "class_character_id"),
    inverseJoinColumns = @JoinColumn(name = "skill_id")
  )
  Set<Skill> availableSkills = new HashSet<>();

  @ManyToMany
  @JoinTable(
    name = "class_study",
    joinColumns = @JoinColumn(name = "class_character_id"),
    inverseJoinColumns = @JoinColumn(name = "study_id")
  )
  Set<Study> availableStudy = new HashSet<>();

  byte skillPoints;

  @OneToMany(
    mappedBy = "classCharacter",
    cascade = CascadeType.ALL,
    orphanRemoval = true
  )
  Set<ClassFeat> availableFeats = new HashSet<>();

  @ManyToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "spells_per_day_id", referencedColumnName = "id")
  SpellsTable spellsPerDay;

  @ManyToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "spells_known_id", referencedColumnName = "id")
  SpellsTable spellsKnown;

  @Enumerated(EnumType.STRING)
  ModifierEnum spellBonus;

  @Enumerated(EnumType.STRING)
  SpellsEnum spellsDomain;

  String initialGold;

  public ClassCharacter(int classCharacterId) {
    this.id = classCharacterId;
    // this.type = classCharacterDTO.classType;
    // this.name = classCharacterDTO.className;
    // this.avatarUrl = classCharacterDTO.avatarUrl;
    // this.hitDice = classCharacterDTO.hitDice;
    // this.savingThrow = classCharacterDTO.savingThrow;
    // this.classBab = classCharacterDTO.classBab;
    // this.availableSkills = MapperSkill.toSkillSet(classCharacterDTO.classSkill);
    // this.availableStudy = MapperSkill.toStudySet(classCharacterDTO.classStudy);
    // this.skillPoints = classCharacterDTO.skillPoints;
    // this.availableFeats = MapperFeats.toFeatsSetDTO(classCharacterDTO.classFeats);
    // this.spellsPerDay = , spellsKnown, spellBonus, spellsDomain, initialGold)
  }
}
