package pl.kolendateam.dadcard.characterCard.dto;

import java.util.ArrayList;
import java.util.List;

import pl.kolendateam.dadcard.classCharacter.dto.ClassPgDTO;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPg;

public class MapperListClassPgToDTO {

    public static ArrayList<ClassPgDTO> toClassPgDTO(List<ClassPg> classes){

        ArrayList<ClassPgDTO> classesDTO = new ArrayList();

        for (ClassPg classPg : classes) {
            
            ClassPgDTO classPgDTO = new ClassPgDTO(classPg);
            classesDTO.add(classPgDTO);
            
        }

        return classesDTO;
    }
    
}
