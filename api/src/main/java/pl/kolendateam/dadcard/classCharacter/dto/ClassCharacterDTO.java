package pl.kolendateam.dadcard.classCharacter.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.classCharacter.entity.ClassCharacter;

@NoArgsConstructor
public class ClassCharacterDTO {
    public int id;
    public String classType;
    public String className;
    public String avatarUrl;
    

    public ClassCharacterDTO(ClassCharacter classCharacter){
        this.avatarUrl = classCharacter.getAvatarUrl();
        this.classType = classCharacter.getType().getTypeEnum();
        this.className = classCharacter.getName();
        this.id = classCharacter.getId();
    }
    
}
