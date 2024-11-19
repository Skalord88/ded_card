package pl.kolendateam.dadcard.feats.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.items.armor.entity.ArmorsEnum;
import pl.kolendateam.dadcard.items.weapons.entity.WeaponCategoriesEnum;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;
import pl.kolendateam.dadcard.skills.entity.SkillStudyRank;
import pl.kolendateam.dadcard.spells.entity.School;
import pl.kolendateam.dadcard.spells.entity.SpellLevel;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
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
  SpellLevel caster;

  Integer bab;

  @JdbcTypeCode(SqlTypes.JSON)
  List<SkillStudyRank> skillStudy;

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

  String text;
}
