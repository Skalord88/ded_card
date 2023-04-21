package pl.kolendateam.dadcard.classCharacter;

import java.util.ArrayList;
import java.util.List;

import pl.kolendateam.dadcard.classCharacter.dto.ClassCharacterDTO;
import pl.kolendateam.dadcard.classCharacter.entity.ClassCharacter;

public class MaperListClassToDTO {
    public static ArrayList<ClassCharacterDTO> toClassCharacterDTO(List<ClassCharacter> classes){

        ArrayList<ClassCharacterDTO> classesDTO = new ArrayList();

        for (ClassCharacter classCharacter : classes) {
            
            ClassCharacterDTO classCharacterDTO = new ClassCharacterDTO(classCharacter);
            classesDTO.add(classCharacterDTO);
            
        }

        return classesDTO;
    }
    
}
