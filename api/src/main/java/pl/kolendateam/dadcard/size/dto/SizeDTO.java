package pl.kolendateam.dadcard.size.dto;

import java.util.Set;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.modifier.MapperModifierBonusDTO;
import pl.kolendateam.dadcard.modifier.dto.ModifierDTO;
import pl.kolendateam.dadcard.size.entity.Size;
import pl.kolendateam.dadcard.size.entity.SizeEnum;

@NoArgsConstructor
public class SizeDTO {

  public int id;
  public SizeEnum size;
  public Set<ModifierDTO> modifiers;

  // public SpecialAttacksDTO specialAttacks;
  // public SkillsDTO skills;
  // public ArmorClassDTO armor;
  // public int bab;

  public SizeDTO(Size size) {
    this.id = size.getId();
    this.size = size.getSize();
    this.modifiers =
      MapperModifierBonusDTO.toListModifierDTO(size.getModifiers());
    // this.specialAttacks =
    //   MapperSpecialAttacks.toSpecialAttacksDTO(size.getSpecialAttacks());
    // this.skills = MapperSkillsToDTO.toOneSkillDTO(size.getSkill());
    // this.armor = MapperArmorClassDTO.toArmorClassDTO(size.getArmorBonus());
    // this.bab = size.getBab();
  }
}
