package pl.kolendateam.dadcard.classCharacter.dto;

import java.util.ArrayList;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.classCharacter.MapperClassFeatsDTO;
import pl.kolendateam.dadcard.classCharacter.entity.ClassCharacter;
import pl.kolendateam.dadcard.feats.dto.ClassFeatsDTO;
import pl.kolendateam.dadcard.skills.dto.SkillsDTO;

@NoArgsConstructor
public class ClassCharacterDTO {
    public int id;
    public String classType;
    public String className;
    public String avatarUrl;
    public ArrayList<SkillsDTO> classSkill;
    public ArrayList<ClassFeatsDTO> classFeats;

    public ClassCharacterDTO(ClassCharacter classCharacter){
        this.avatarUrl = classCharacter.getAvatarUrl();
        this.classType = classCharacter.getType().getTypeEnum();
        this.className = classCharacter.getName();
        this.id = classCharacter.getId();
        if(classCharacter.getClassFeatsMap()==null){
            this.classFeats = null;
        } else {
            this.classFeats = MapperClassFeatsDTO.toClassFeatsDTO(classCharacter.getClassFeatsMap());
        }
    }
    
}
