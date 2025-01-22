package pl.kolendateam.dadcard.classCharacter.dto;

import java.util.Set;
import lombok.NoArgsConstructor;
import org.apache.catalina.mapper.Mapper;
import pl.kolendateam.dadcard.classCharacter.entity.ClassCharacter;
import pl.kolendateam.dadcard.feats.MapperFeatsDTO;
import pl.kolendateam.dadcard.feats.dto.ClassFeatsDTO;
import pl.kolendateam.dadcard.skills.MapperSkillToDTO;
import pl.kolendateam.dadcard.skills.dto.SkillDTO;
import pl.kolendateam.dadcard.skills.dto.StudyDTO;
import pl.kolendateam.dadcard.spells.MapperSpellsTableDTO;
import pl.kolendateam.dadcard.spells.dto.SpellsTableDTO;
import pl.kolendateam.dadcard.spells.entity.SpellsEnum;

@NoArgsConstructor
public class ClassCharacterDTO {

  public int id;
  public String classType;
  public String className;
  public String avatarUrl;
  public byte hitDice;
  public double classBab;
  public String savingThrow;
  public byte skillPoints;
  public Set<SkillDTO> classSkill;
  public Set<StudyDTO> classStudy;
  public Set<ClassFeatsDTO> classFeats;
  public SpellsTableDTO spellsPerDay;
  public SpellsTableDTO spellsKnown;
  public SpellsEnum spellsDomain;

  public ClassCharacterDTO(ClassCharacter classCharacter) {
    this.id = classCharacter.getId();

    this.classType = classCharacter.getType().getTypeEnum();
    this.className = classCharacter.getName().toString();
    this.avatarUrl = classCharacter.getAvatarUrl();
    this.hitDice = classCharacter.getHitDice();
    this.classBab = classCharacter.getClassBab();
    this.savingThrow = classCharacter.getSavingThrow();
    this.skillPoints = classCharacter.getSkillPoints();
    this.classSkill =
      MapperSkillToDTO.toSkillSetDTO(classCharacter.getAvailableSkills());
    this.classStudy =
      MapperSkillToDTO.toStudySetDTO(classCharacter.getAvailableStudy());
    this.classFeats =
      MapperFeatsDTO.toClassFeatsDTO(classCharacter.getAvailableFeats());
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
    this.spellsDomain =
      classCharacter.getSpellsDomain() != null
        ? classCharacter.getSpellsDomain()
        : null;
  }
}
