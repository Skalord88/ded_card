package pl.kolendateam.dadcard.size.dto;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.armorClass.MapperArmorClassDTO;
import pl.kolendateam.dadcard.armorClass.dto.ArmorClassDTO;
import pl.kolendateam.dadcard.attack.MapperSpecialAttacks;
import pl.kolendateam.dadcard.attack.dto.SpecialAttacksDTO;
import pl.kolendateam.dadcard.size.entity.Size;
import pl.kolendateam.dadcard.size.entity.SizeEnum;
import pl.kolendateam.dadcard.skills.MapperSkillsToDTO;
import pl.kolendateam.dadcard.skills.dto.SkillsDTO;

@NoArgsConstructor
public class SizeDTO {

  public int id;
  public SizeEnum size;
  public SpecialAttacksDTO specialAttacks;
  public SkillsDTO skills;
  public ArmorClassDTO armor;
  public int bab;

  public SizeDTO(Size size) {
    this.id = size.getId();
    this.size = size.getSize();
    this.specialAttacks =
      MapperSpecialAttacks.toSpecialAttacksDTO(size.getSpecialAttacks());
    this.skills = MapperSkillsToDTO.toOneSkillDTO(size.getSkill());
    this.armor = MapperArmorClassDTO.toArmorClassDTO(size.getArmorBonus());
    this.bab = size.getBab();
  }
}
