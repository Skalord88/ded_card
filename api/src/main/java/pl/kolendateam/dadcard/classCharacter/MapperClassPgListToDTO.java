package pl.kolendateam.dadcard.classCharacter;

import java.util.ArrayList;

import pl.kolendateam.dadcard.classCharacter.dto.ClassPgListDTO;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPg;

public class MapperClassPgListToDTO {
    public static ArrayList<ClassPgListDTO> toClassPgListDTO(ArrayList<ClassPg> classPgArray){
        ArrayList<ClassPgListDTO> classesDTO = new ArrayList();

        for (ClassPg classPg : classPgArray) {
            
            ClassPgListDTO classPgListDTO = new ClassPgListDTO(classPg.getName(),classPg.getLevel());
            classesDTO.add(classPgListDTO);
        }

        return classesDTO;
    }
}
