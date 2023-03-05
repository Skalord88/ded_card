package pl.kolendateam.dadcard.clas;

import java.util.ArrayList;
import java.util.List;

public class MaperListClassTypeToDTO {
    public static ArrayList<RaceClassTypeDTO> toClassTypeBaseDTO(List<Class> classes){

        ArrayList<ClassTypeBaseDTO> classesDTO = new ArrayList();

        for (Class class : classes) {
            boolean skipCreateClassTypeDTO = false;

            for (ClassTypeBaseDTO classDTO : classesDTO) {
                if (classTypeDTO.classType.equals(class.getClassType)) { 
                    ClassBaseDTO tempClass = new ClassBaseDTO(class);
                    classTypeDTO.class.add(tempclass);
                    skipCreateClassTypeDTO = true;
                }
            }

            if(!skipCreateClassTypeDTO){
                ClassTypeBaseDTO tempClassType = new ClassTypeBaseDTO(class);
                classesDTO.add(tempClassType);
            }
        }

        return classesDTO;
    }
    
}
