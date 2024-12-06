package pl.kolendateam.dadcard.classCharacter.dto;

import java.util.Set;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.classCharacter.entity.ClassCharacter;
import pl.kolendateam.dadcard.feats.MapperFeatsDTO;
import pl.kolendateam.dadcard.feats.dto.ClassFeatsDTO;
import pl.kolendateam.dadcard.skills.MapperSkillToDTO;
import pl.kolendateam.dadcard.skills.dto.SkillDTO;
import pl.kolendateam.dadcard.skills.dto.StudyDTO;

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

    this.classFeats =
      MapperFeatsDTO.toClassFeatsDTO(classCharacter.getAvailableFeats());
  }
}
