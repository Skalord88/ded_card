package pl.kolendateam.dadcard.classCharacter.dto;

import java.util.Set;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.classCharacter.entity.ClassCharacter;
import pl.kolendateam.dadcard.classCharacter.entity.ClassTypeEnum;
import pl.kolendateam.dadcard.classCharacter.entity.EnumClass;
import pl.kolendateam.dadcard.feats.MapperFeats;
import pl.kolendateam.dadcard.feats.dto.ClassFeatDTO;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;
import pl.kolendateam.dadcard.skills.MapperSkill;
import pl.kolendateam.dadcard.skills.dto.SkillDTO;
import pl.kolendateam.dadcard.skills.dto.StudyDTO;
import pl.kolendateam.dadcard.spells.MapperSpellsTableDTO;
import pl.kolendateam.dadcard.spells.dto.SpellsTableDTO;
import pl.kolendateam.dadcard.spells.entity.SpellsEnum;

@NoArgsConstructor
public class ClassCharacterDTO {

  public int id;
  public ClassTypeEnum classType;
  public EnumClass className;
  public String avatarUrl;
  public byte hitDice;
  public double classBab;
  public String savingThrow;
  public byte skillPoints;
  public Set<SkillDTO> classSkill;
  public Set<StudyDTO> classStudy;
  public Set<ClassFeatDTO> classFeats;
  public SpellsTableDTO spellsPerDay;
  public SpellsTableDTO spellsKnown;
  public ModifierEnum spellBonus;
  public SpellsEnum spellsDomain;

  public ClassCharacterDTO(ClassCharacter classCharacter) {
    this.id = classCharacter.getId();
    this.classType = classCharacter.getClassType();
    this.className = classCharacter.getName();
    this.avatarUrl = classCharacter.getAvatarUrl();
    this.hitDice = classCharacter.getHitDice();
    this.classBab = classCharacter.getClassBab();
    this.savingThrow = classCharacter.getSavingThrow();
    this.skillPoints = classCharacter.getSkillPoints();
    this.classSkill =
      classCharacter.getAvailableSkills() != null
        ? MapperSkill.toSkillSetDTO(classCharacter.getAvailableSkills())
        : null;
    this.classStudy =
      classCharacter.getAvailableStudy() != null
        ? MapperSkill.toStudySetDTO(classCharacter.getAvailableStudy())
        : null;
    this.classFeats =
      classCharacter.getAvailableFeats() != null
        ? MapperFeats.toClassFeatsDTO(classCharacter.getAvailableFeats())
        : null;
    this.spellsPerDay =
      classCharacter.getSpellsPerDay() != null
        ? MapperSpellsTableDTO.toSpellsTableDTO(
          classCharacter.getSpellsPerDay()
        )
        : null;
    this.spellsKnown =
      classCharacter.getSpellsKnown() != null
        ? MapperSpellsTableDTO.toSpellsTableDTO(classCharacter.getSpellsKnown())
        : null;
    this.spellBonus =
      classCharacter.getSpellBonus() != null
        ? classCharacter.getSpellBonus()
        : null;
    this.spellsDomain =
      classCharacter.getSpellsDomain() != null
        ? classCharacter.getSpellsDomain()
        : null;
  }
}
