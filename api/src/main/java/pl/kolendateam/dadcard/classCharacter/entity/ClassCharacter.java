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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import pl.kolendateam.dadcard.feats.entity.ClassFeats;
import pl.kolendateam.dadcard.feats.entity.Feats;
import pl.kolendateam.dadcard.skills.entity.Skills;
import pl.kolendateam.dadcard.skills.entity.Study;
import pl.kolendateam.dadcard.spells.entity.SpellsEnum;

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
  TypeEnum type;

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
  Set<Skills> availableSkills = new HashSet<>();

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
  Set<ClassFeats> availableFeats = new HashSet<>();

  // String classFeatsMap;

  @Enumerated(EnumType.STRING)
  SpellsEnum spellsPerDay;

  @Enumerated(EnumType.STRING)
  SpellsEnum spellsKnown;

  @Enumerated(EnumType.STRING)
  SpellsEnum spellsDomain;

  String initialGold;
}
