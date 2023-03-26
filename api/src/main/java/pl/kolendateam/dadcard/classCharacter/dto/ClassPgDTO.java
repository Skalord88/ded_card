package pl.kolendateam.dadcard.classCharacter.dto;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPg;

@NoArgsConstructor
public class ClassPgDTO {

    public int id;
    public String className;

    public ClassPgDTO(ClassPg classPg){

        this.id = classPg.getId();
        this.className = classPg.getName();
        
    }
    
}
