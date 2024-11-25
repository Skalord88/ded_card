package pl.kolendateam.dadcard.feats.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.abilitys.MapperAbilitysToDTO;
import pl.kolendateam.dadcard.abilitys.dto.AbilitysDTO;
import pl.kolendateam.dadcard.armorClass.MapperArmorClassDTO;
import pl.kolendateam.dadcard.armorClass.dto.ArmorClassDTO;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPcLevel;
import pl.kolendateam.dadcard.feats.MapperFeatsDTO;
import pl.kolendateam.dadcard.feats.entity.Prerequisite;
import pl.kolendateam.dadcard.items.MapperItemsDTO;
import pl.kolendateam.dadcard.items.armor.entity.ArmorsEnum;
import pl.kolendateam.dadcard.items.dto.ItemsDTO;
import pl.kolendateam.dadcard.items.weapons.entity.WeaponCategoriesEnum;
import pl.kolendateam.dadcard.skills.entity.SkillStudyRank;
import pl.kolendateam.dadcard.spells.MapperSpellsDTO;
import pl.kolendateam.dadcard.spells.dto.SchoolDTO;
import pl.kolendateam.dadcard.spells.entity.SpellLevel;

@AllArgsConstructor
@NoArgsConstructor
public class PrerequisiteDTO {

  public int id;
  public AbilitysDTO abilitys;
  public List<FeatsDTO> feats;
  public SpellLevel[] caster;
  public Integer bab;
  public SkillStudyRank[] skillStudy;
  public ArmorClassDTO armorClass;
  public ArmorsEnum[] armorType;
  public WeaponCategoriesEnum[] weaponType;
  public List<SchoolDTO> schools;
  public ClassPcLevel[] classPc;
  public List<ItemsDTO> items;
  public String text;

  public PrerequisiteDTO(Prerequisite pre) {
    this.id = pre.getId();
    this.abilitys = MapperAbilitysToDTO.toAbilityDTO(pre.getAbilitys());
    this.feats = MapperFeatsDTO.toFeatsDTO(pre.getFeats());
    this.caster = pre.getCaster() != null ? pre.getCaster() : null;
    this.bab = pre.getBab();
    this.skillStudy = pre.getSkillStudy() != null ? pre.getSkillStudy() : null;
    this.armorClass = MapperArmorClassDTO.toArmorClassDTO(pre.getArmorClass());
    this.armorType = pre.getArmorType() != null ? pre.getArmorType() : null;
    this.weaponType = pre.getWeaponType() != null ? pre.getWeaponType() : null;
    this.schools = MapperSpellsDTO.toSchoolListDTO(pre.getSchools());
    this.items = MapperItemsDTO.toListItemsDTO(pre.getItems());
    this.classPc = pre.getClassPc() != null ? pre.getClassPc() : null;
    this.text = pre.getText();
  }
}
