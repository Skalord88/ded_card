package pl.kolendateam.dadcard.classCharacter.dto;

import java.util.ArrayList;
import java.util.Set;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.classCharacter.entity.ClassCharacter;
import pl.kolendateam.dadcard.feats.MapperFeatsDTO;
import pl.kolendateam.dadcard.feats.dto.ClassFeatsDTO;
import pl.kolendateam.dadcard.skills.dto.SkillsDTO;

@NoArgsConstructor
public class ClassCharacterDTO {

  public int id;
  public String classType;
  public String className;
  public String avatarUrl;
  public ArrayList<SkillsDTO> classSkill;
  // public ArrayList<ClassFeatsDTO> classFeats;
  public Set<ClassFeatsDTO> classFeats;

  public ClassCharacterDTO(ClassCharacter classCharacter) {
    this.avatarUrl = classCharacter.getAvatarUrl();
    this.classType = classCharacter.getType().getTypeEnum();
    this.className = classCharacter.getName().toString();
    this.id = classCharacter.getId();
    // this.classFeats =
    //   MapperClassFeatsDTO.toClassFeatsDTO(classCharacter.getClassFeatsMap());
    this.classFeats =
      MapperFeatsDTO.toClassFeatsDTO(classCharacter.getAvailableFeats());
  }
}
