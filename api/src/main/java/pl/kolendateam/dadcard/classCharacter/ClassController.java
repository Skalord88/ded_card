package pl.kolendateam.dadcard.classCharacter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.kolendateam.dadcard.classCharacter.dto.ClassCharacterDTO;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPgDTO;
import pl.kolendateam.dadcard.classCharacter.entity.ClassCharacter;
import pl.kolendateam.dadcard.classCharacter.repository.ClassRepository;

@RestController
@RequestMapping("class")
public class ClassController {

    ClassRepository classRepository;

    @Autowired
    ClassController(ClassRepository classRepository) {
        this.classRepository = classRepository;
    }

    @GetMapping("")
    public ArrayList<ClassCharacterDTO> getAll() {
        List<ClassCharacter> classes = this.classRepository.findAll();

        return MaperListClassToDTO.toClassCharacterDTO(classes);

    }

    public static ArrayList<ClassPgDTO> addClassToList(ClassCharacter classCharacter, Character character, String className) {
        
        ArrayList<ClassPgDTO> classPgListDTO = new ArrayList<ClassPgDTO>();
                
        for (ClassPgDTO classList : classPgListDTO){
            boolean skipClassPg = false;
            
            if(className.equals(classCharacter.getName())){
                classList.level = +1;
                skipClassPg = true;
            }
            
            if(!skipClassPg){
                
                ClassPgDTO clPg = new ClassPgDTO();
                clPg.className.equals(classCharacter.getName());
                clPg.id = classCharacter.getId();
                clPg.level = 1;

            }

        } return classPgListDTO;
    }
}
