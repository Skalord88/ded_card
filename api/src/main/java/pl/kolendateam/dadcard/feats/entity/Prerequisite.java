package pl.kolendateam.dadcard.feats.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
import jakarta.persistence.OneToOne;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.abilitys.MapperAbilitys;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.armorClass.MapperArmorClass;
import pl.kolendateam.dadcard.armorClass.entity.ArmorClass;
import pl.kolendateam.dadcard.attack.MapperAttackRoll;
import pl.kolendateam.dadcard.attack.MapperSpecialAttacks;
import pl.kolendateam.dadcard.attack.entity.AttackRoll;
import pl.kolendateam.dadcard.attack.entity.DamageBonus;
import pl.kolendateam.dadcard.attack.entity.SpecialAttacks;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPcLevel;
import pl.kolendateam.dadcard.feats.MapperFeats;
import pl.kolendateam.dadcard.feats.MapperPrerequisiteBonus;
import pl.kolendateam.dadcard.feats.dto.PrerequisiteDTO;
import pl.kolendateam.dadcard.feats.dto.PrerequisiteFeatsDTO;
import pl.kolendateam.dadcard.items.MapperItems;
import pl.kolendateam.dadcard.items.armor.entity.ArmorsEnum;
import pl.kolendateam.dadcard.items.dto.ItemsDTO;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.weapons.entity.WeaponCategoriesEnum;
import pl.kolendateam.dadcard.modifier.MapperSpecialAbilities;
import pl.kolendateam.dadcard.modifier.entity.SpecialAbilities;
import pl.kolendateam.dadcard.race.entity.Speed;
import pl.kolendateam.dadcard.savingThrow.MapperSavingThrow;
import pl.kolendateam.dadcard.savingThrow.entity.SavingThrow;
import pl.kolendateam.dadcard.skills.MapperSkill;
import pl.kolendateam.dadcard.skills.entity.PrerequisiteSkills;
import pl.kolendateam.dadcard.spells.MapperSpells;
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
  public Long id;

  @JdbcTypeCode(SqlTypes.JSON)
  Abilitys abilitys;

  @JdbcTypeCode(SqlTypes.JSON)
  FeatsTypeEnum[] featType;

  @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
  @JoinTable(
    name = "prerequisite_feat",
    joinColumns = @JoinColumn(name = "prerequisite_id"),
    inverseJoinColumns = @JoinColumn(name = "feat_id")
  )
  List<Feats> feats = new ArrayList<>();

  @JdbcTypeCode(SqlTypes.JSON)
  SpellLevel[] caster;

  Integer bab;

  @JdbcTypeCode(SqlTypes.JSON)
  AttackRoll attackRoll;

  Integer initiative;

  @JdbcTypeCode(SqlTypes.JSON)
  Speed speed;

  @JdbcTypeCode(SqlTypes.JSON)
  SavingThrow savingThrow;

  @JdbcTypeCode(SqlTypes.JSON)
  SpecialAttacks specialAttacks;

  @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
  @JoinTable(
    name = "prerequisite_skill_study",
    joinColumns = @JoinColumn(name = "prerequisite_id"),
    inverseJoinColumns = @JoinColumn(name = "prerequisite_skill_id")
  )
  List<PrerequisiteSkills> prerequisiteSkillsStudy = new ArrayList<>();

  @JdbcTypeCode(SqlTypes.JSON)
  ArmorClass armorClass;

  @Enumerated(EnumType.STRING)
  ArmorsEnum armorType;

  @Enumerated(EnumType.STRING)
  WeaponCategoriesEnum weaponType;

  @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
  @JoinTable(
    name = "prerequisite_schools",
    joinColumns = @JoinColumn(name = "prerequisite_id"),
    inverseJoinColumns = @JoinColumn(name = "schools_id")
  )
  List<School> schools;

  @JdbcTypeCode(SqlTypes.JSON)
  ClassPcLevel[] classPc;

  @JdbcTypeCode(SqlTypes.JSON)
  DamageBonus damageBonus;

  @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
  @JoinTable(
    name = "prerequisite_item",
    joinColumns = @JoinColumn(name = "prerequisite_id"),
    inverseJoinColumns = @JoinColumn(name = "item_id")
  )
  List<Items> items;

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "domain_id", referencedColumnName = "id")
  Domains domain;

  @ManyToMany
  @JoinTable(
    name = "prerequisite_special_abilities",
    joinColumns = @JoinColumn(name = "prerequisite_id"),
    inverseJoinColumns = @JoinColumn(name = "special_abilities_id")
  )
  Set<SpecialAbilities> specialAbilities = new HashSet<>();

  String text;

  public Prerequisite(
    int idPre,
    List<PrerequisiteFeatsDTO> preFeatsDTO,
    List<ItemsDTO> itemsDTO
  ) {
    this.id = (long) idPre;
    this.feats = preFeatsDTO != null ? MapperFeats.toFeats(preFeatsDTO) : null;
    this.items =
      preFeatsDTO != null ? MapperItems.toItemsListFromDTOList(itemsDTO) : null;
  }

  public Prerequisite(PrerequisiteDTO preDTO) {
    this.id = preDTO.id != null ? preDTO.id : null;
    this.abilitys =
      preDTO.abilitys != null
        ? MapperAbilitys.toAbility(preDTO.abilitys)
        : null;
    this.featType = preDTO.featType != null ? preDTO.featType : null;
    this.feats =
      preDTO.feats != null ? MapperFeats.toFeats(preDTO.feats) : null;
    this.caster = preDTO.caster != null ? preDTO.caster : null;
    this.bab = preDTO.bab != null ? preDTO.bab : null;
    this.attackRoll =
      preDTO.attackRoll != null
        ? MapperAttackRoll.toAttackRoll(preDTO.attackRoll)
        : null;
    this.initiative = preDTO.initiative != null ? preDTO.initiative : null;
    this.speed =
      preDTO.speed != null
        ? MapperPrerequisiteBonus.toSpeed(preDTO.speed)
        : null;
    this.savingThrow =
      preDTO.savingThrow != null
        ? MapperSavingThrow.toSavingThrow(preDTO.savingThrow)
        : null;
    this.specialAttacks =
      preDTO.specialAttacks != null
        ? MapperSpecialAttacks.toSpecialAttacks(preDTO.specialAttacks)
        : null;
    this.prerequisiteSkillsStudy =
      preDTO.skillStudy != null
        ? MapperSkill.toPrerequisiteSkillsStudyList(preDTO.skillStudy)
        : null;
    this.armorClass =
      preDTO.armorClass != null
        ? MapperArmorClass.toArmorClass(preDTO.armorClass)
        : null;
    this.armorType = preDTO.armorType != null ? preDTO.armorType : null;
    this.weaponType = preDTO.weaponType != null ? preDTO.weaponType : null;
    this.schools =
      preDTO.schools != null ? MapperSpells.toSchoolList(preDTO.schools) : null;
    this.classPc = preDTO.classPc != null ? preDTO.classPc : null;
    this.damageBonus =
      preDTO.damageBonus != null
        ? MapperAttackRoll.toDamageBonus(preDTO.damageBonus)
        : null;
    this.items =
      preDTO.items != null
        ? MapperItems.toItemsListFromDTOList(preDTO.items)
        : null;
    this.domain = preDTO != null ? preDTO.domain : null;
    this.specialAbilities =
      preDTO.specialAbilities != null
        ? MapperSpecialAbilities.toSpecialAbilitiesSet(preDTO.specialAbilities)
        : null;
    this.text = preDTO.text != null ? preDTO.text : null;
  }

  public Prerequisite(Long idDTO) {
    this.id = idDTO;
  }
}
