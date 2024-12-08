package pl.kolendateam.dadcard.feats.dto;

import java.util.List;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.abilitys.MapperAbilitysToDTO;
import pl.kolendateam.dadcard.abilitys.dto.AbilitysDTO;
import pl.kolendateam.dadcard.armorClass.MapperArmorClassDTO;
import pl.kolendateam.dadcard.armorClass.dto.ArmorClassDTO;
import pl.kolendateam.dadcard.classCharacter.MapperSavingThrowToDTO;
import pl.kolendateam.dadcard.classCharacter.dto.SavingThrowDTO;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPcLevel;
import pl.kolendateam.dadcard.classCharacter.entity.SavingThrow;
import pl.kolendateam.dadcard.feats.MapperFeatsDTO;
import pl.kolendateam.dadcard.feats.entity.Prerequisite;
import pl.kolendateam.dadcard.items.MapperItemsDTO;
import pl.kolendateam.dadcard.items.armor.entity.ArmorsEnum;
import pl.kolendateam.dadcard.items.dto.ItemsDTO;
import pl.kolendateam.dadcard.items.weapons.entity.WeaponCategoriesEnum;
import pl.kolendateam.dadcard.skills.MapperSkillToDTO;
import pl.kolendateam.dadcard.skills.dto.PrerequisiteSkillDTO;
import pl.kolendateam.dadcard.spells.MapperSpellsDTO;
import pl.kolendateam.dadcard.spells.dto.SchoolDTO;
import pl.kolendateam.dadcard.spells.entity.SpellLevel;

@NoArgsConstructor
public class PrerequisiteDTO {

  public int id;
  public AbilitysDTO abilitys;
  public List<PrerequisiteFeatsDTO> feats;
  public SpellLevel[] caster;
  public Integer bab;
  public Integer attackRoll;
  public SavingThrowDTO savingThrow;
  public List<PrerequisiteSkillDTO> skillStudy;
  public ArmorClassDTO armorClass;
  public ArmorsEnum[] armorType;
  public WeaponCategoriesEnum[] weaponType;
  public List<SchoolDTO> schools;
  public ClassPcLevel[] classPc;
  public List<ItemsDTO> items;
  public String text;

  public PrerequisiteDTO(Prerequisite pre) {
    this.id = pre.getId();
    this.abilitys =
      pre.getAbilitys() != null
        ? MapperAbilitysToDTO.toAbilityDTO(pre.getAbilitys())
        : null;
    this.feats =
      pre.getFeats() != null
        ? MapperFeatsDTO.toPrerequisiteFeatsDTO(pre.getFeats())
        : null;
    this.caster = pre.getCaster() != null ? pre.getCaster() : null;
    this.bab = pre.getBab();
    this.attackRoll = pre.getAttackRoll();
    this.savingThrow =
      pre.getSavingThrow() != null
        ? MapperSavingThrowToDTO.toSavingThrowDTO(pre.getSavingThrow())
        : null;
    this.skillStudy =
      pre.getPrerequisiteSkillsStudy() != null
        ? MapperSkillToDTO.toPrerequisiteSkillDTO(
          pre.getPrerequisiteSkillsStudy()
        )
        : null;
    this.armorClass =
      pre.getArmorClass() != null
        ? MapperArmorClassDTO.toArmorClassDTO(pre.getArmorClass())
        : null;
    this.armorType = pre.getArmorType() != null ? pre.getArmorType() : null;
    this.weaponType = pre.getWeaponType() != null ? pre.getWeaponType() : null;
    this.schools =
      pre.getSchools() != null
        ? MapperSpellsDTO.toSchoolListDTO(pre.getSchools())
        : null;
    this.items =
      pre.getItems() != null
        ? MapperItemsDTO.toListItemsDTO(pre.getItems())
        : null;
    this.classPc = pre.getClassPc() != null ? pre.getClassPc() : null;
    this.text = pre.getText();
  }
}
