package pl.kolendateam.dadcard.feats.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.armorClass.entity.ArmorClass;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPcLevel;
import pl.kolendateam.dadcard.classCharacter.entity.SavingThrow;
import pl.kolendateam.dadcard.items.armor.entity.ArmorsEnum;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.weapons.entity.WeaponCategoriesEnum;
import pl.kolendateam.dadcard.skills.entity.PrerequisiteSkills;
import pl.kolendateam.dadcard.spells.entity.Domains;
import pl.kolendateam.dadcard.spells.entity.School;
import pl.kolendateam.dadcard.spells.entity.SpellLevel;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Prerequisite implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public int id;

  @JdbcTypeCode(SqlTypes.JSON)
  Abilitys abilitys;

  @ManyToMany(cascade = CascadeType.MERGE)
  @JoinTable(
    name = "prerequisite_feat",
    joinColumns = @JoinColumn(name = "prerequisite_id"),
    inverseJoinColumns = @JoinColumn(name = "feat_id")
  )
  List<Feats> feats = new ArrayList<>();

  @JdbcTypeCode(SqlTypes.JSON)
  SpellLevel[] caster;

  Integer bab;

  Integer attackRoll;

  @JdbcTypeCode(SqlTypes.JSON)
  SavingThrow savingThrow;

  @ManyToMany(cascade = CascadeType.MERGE)
  @JoinTable(
    name = "prerequisite_skill_study",
    joinColumns = @JoinColumn(name = "prerequisite_id"),
    inverseJoinColumns = @JoinColumn(name = "prerequisite_skill_id")
  )
  List<PrerequisiteSkills> prerequisiteSkillsStudy = new ArrayList<>();

  @JdbcTypeCode(SqlTypes.JSON)
  ArmorClass armorClass;

  @JdbcTypeCode(SqlTypes.JSON)
  ArmorsEnum[] armorType;

  @JdbcTypeCode(SqlTypes.JSON)
  WeaponCategoriesEnum[] weaponType;

  @ManyToMany(cascade = CascadeType.MERGE)
  @JoinTable(
    name = "prerequisite_schools",
    joinColumns = @JoinColumn(name = "prerequisite_id"),
    inverseJoinColumns = @JoinColumn(name = "schools_id")
  )
  List<School> schools;

  @JdbcTypeCode(SqlTypes.JSON)
  ClassPcLevel[] classPc;

  @ManyToMany(cascade = CascadeType.MERGE)
  @JoinTable(
    name = "prerequisite_item",
    joinColumns = @JoinColumn(name = "prerequisite_id"),
    inverseJoinColumns = @JoinColumn(name = "item_id")
  )
  List<Items> items;

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "domain_id", referencedColumnName = "id")
  Domains domain;

  String text;
}
