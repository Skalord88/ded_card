package pl.kolendateam.dadcard.feats.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.abilitys.MapperAbilitysToDTO;
import pl.kolendateam.dadcard.abilitys.dto.AbilitysDTO;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.feats.MapperFeatsDTO;
import pl.kolendateam.dadcard.feats.entity.Feats;
import pl.kolendateam.dadcard.feats.entity.Prerequisite;
import pl.kolendateam.dadcard.items.armor.entity.ArmorsEnum;
import pl.kolendateam.dadcard.items.weapons.entity.WeaponCategoriesEnum;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;
import pl.kolendateam.dadcard.skills.entity.SkillStudyRank;
import pl.kolendateam.dadcard.spells.MapperSpellsDTO;
import pl.kolendateam.dadcard.spells.dto.SchoolDTO;
import pl.kolendateam.dadcard.spells.entity.School;
import pl.kolendateam.dadcard.spells.entity.SpellLevel;

@AllArgsConstructor
@NoArgsConstructor
public class PrerequisiteDTO {

  public int id;
  public AbilitysDTO abilitys;
  public List<FeatsDTO> feats;
  public SpellLevel caster;
  public Integer bab;
  public List<SkillStudyRank> skillStudy;
  public ArmorsEnum[] armorType;
  public WeaponCategoriesEnum[] weaponType;
  public List<SchoolDTO> schools;
  public String text;

  public PrerequisiteDTO(Prerequisite pre) {
    this.id = pre.getId();
    this.abilitys = MapperAbilitysToDTO.toAbilityDTO(pre.getAbilitys());
    this.feats = MapperFeatsDTO.toFeatsDTO(pre.getFeats());
    this.caster = pre.getCaster();
    this.bab = pre.getBab();
    this.skillStudy = pre.getSkillStudy();
    this.armorType = pre.getArmorType();
    this.weaponType = pre.getWeaponType();
    this.schools = MapperSpellsDTO.toSchoolListDTO(pre.getSchools());
    this.text = pre.getText();
  }
}
