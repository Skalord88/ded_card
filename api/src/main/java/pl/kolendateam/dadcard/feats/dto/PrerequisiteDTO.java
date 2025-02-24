package pl.kolendateam.dadcard.feats.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import pl.kolendateam.dadcard.abilitys.MapperAbilitys;
import pl.kolendateam.dadcard.abilitys.dto.AbilitysDTO;
import pl.kolendateam.dadcard.armorClass.MapperArmorClass;
import pl.kolendateam.dadcard.armorClass.dto.ArmorClassDTO;
import pl.kolendateam.dadcard.attack.MapperAttackRoll;
import pl.kolendateam.dadcard.attack.MapperSpecialAttacks;
import pl.kolendateam.dadcard.attack.dto.AttackRollDTO;
import pl.kolendateam.dadcard.attack.dto.DamageBonusDTO;
import pl.kolendateam.dadcard.attack.dto.SpecialAttacksDTO;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPcLevel;
import pl.kolendateam.dadcard.feats.MapperFeats;
import pl.kolendateam.dadcard.feats.MapperPrerequisiteBonus;
import pl.kolendateam.dadcard.feats.entity.FeatsTypeEnum;
import pl.kolendateam.dadcard.feats.entity.Prerequisite;
import pl.kolendateam.dadcard.items.MapperItemsDTO;
import pl.kolendateam.dadcard.items.armor.entity.ArmorsEnum;
import pl.kolendateam.dadcard.items.dto.ItemsDTO;
import pl.kolendateam.dadcard.items.weapons.entity.WeaponCategoriesEnum;
import pl.kolendateam.dadcard.race.dto.SpeedDTO;
import pl.kolendateam.dadcard.savingThrow.MapperSavingThrow;
import pl.kolendateam.dadcard.savingThrow.dto.SavingThrowDTO;
import pl.kolendateam.dadcard.skills.MapperSkill;
import pl.kolendateam.dadcard.skills.dto.PrerequisiteSkillDTO;
import pl.kolendateam.dadcard.spells.MapperSpells;
import pl.kolendateam.dadcard.spells.dto.SchoolDTO;
import pl.kolendateam.dadcard.spells.entity.Domains;
import pl.kolendateam.dadcard.spells.entity.SpellLevel;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PrerequisiteDTO {

  public Long id;
  public AbilitysDTO abilitys;
  public FeatsTypeEnum[] featType;
  public List<PrerequisiteFeatsDTO> feats;
  public SpellLevel[] caster;
  public Integer bab;
  public Integer initiative;
  public AttackRollDTO attackRoll;
  public DamageBonusDTO damageBonus;
  public SpeedDTO speed;
  public SavingThrowDTO savingThrow;
  public SpecialAttacksDTO specialAttacks;
  public List<PrerequisiteSkillDTO> skillStudy;
  public ArmorClassDTO armorClass;
  public ArmorsEnum armorType;
  public WeaponCategoriesEnum weaponType;
  public List<SchoolDTO> schools;
  public ClassPcLevel[] classPc;
  public List<ItemsDTO> items;
  public Domains domain;
  public String text;

  public PrerequisiteDTO(Prerequisite pre) {
    this.id = pre.getId() != null ? pre.getId() : null;
    this.abilitys =
      pre.getAbilitys() != null
        ? MapperAbilitys.toAbilityDTO(pre.getAbilitys())
        : null;
    this.featType = pre.getFeatType() != null ? pre.getFeatType() : null;
    this.feats =
      pre.getFeats() != null
        ? MapperFeats.toPrerequisiteFeatsDTO(pre.getFeats())
        : null;
    this.caster = pre.getCaster() != null ? pre.getCaster() : null;
    this.bab = pre.getBab();
    this.damageBonus =
      pre.getDamageBonus() != null
        ? MapperAttackRoll.toDamageBonusDTO(pre.getDamageBonus())
        : null;
    this.attackRoll =
      pre.getAttackRoll() != null
        ? MapperAttackRoll.toAttackRollDTO(pre.getAttackRoll())
        : null;
    this.speed =
      pre.getSpeed() != null
        ? MapperPrerequisiteBonus.toSpeedDTO(pre.getSpeed())
        : null;
    this.savingThrow =
      pre.getSavingThrow() != null
        ? MapperSavingThrow.toSavingThrowDTO(pre.getSavingThrow())
        : null;
    this.specialAttacks =
      pre.getSpecialAttacks() != null
        ? MapperSpecialAttacks.toSpecialAttacksDTO(pre.getSpecialAttacks())
        : null;
    this.skillStudy =
      pre.getPrerequisiteSkillsStudy() != null
        ? MapperSkill.toPrerequisiteSkillDTO(pre.getPrerequisiteSkillsStudy())
        : null;
    this.armorClass =
      pre.getArmorClass() != null
        ? MapperArmorClass.toArmorClassDTO(pre.getArmorClass())
        : null;
    this.armorType = pre.getArmorType() != null ? pre.getArmorType() : null;
    this.weaponType = pre.getWeaponType() != null ? pre.getWeaponType() : null;
    this.schools =
      pre.getSchools() != null
        ? MapperSpells.toSchoolListDTO(pre.getSchools())
        : null;
    this.items =
      pre.getItems() != null
        ? MapperItemsDTO.toListItemsDTO(pre.getItems())
        : null;
    this.classPc = pre.getClassPc() != null ? pre.getClassPc() : null;
    this.text = pre.getText();
  }
}
