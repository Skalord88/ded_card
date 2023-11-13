package pl.kolendateam.dadcard.classCharacter;

import java.util.ArrayList;

import pl.kolendateam.dadcard.classCharacter.dto.ClassPcListDTO;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPc;

public class MapperClassPcListToDTO {
    public static ArrayList<ClassPcListDTO> toClassPcListDTO(ArrayList<ClassPc> classPcArray) {
        ArrayList<ClassPcListDTO> classesDTO = new ArrayList<>();

        for (ClassPc classPc : classPcArray) {

            ClassPcListDTO classPcListDTO = new ClassPcListDTO(classPc.getName().toString(), classPc.getLevel());
            classesDTO.add(classPcListDTO);
        }

        return classesDTO;
    }
}
