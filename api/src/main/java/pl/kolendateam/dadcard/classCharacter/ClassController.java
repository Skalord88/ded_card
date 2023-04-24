package pl.kolendateam.dadcard.classCharacter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.kolendateam.dadcard.classCharacter.dto.ClassCharacterDTO;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPcDTO;
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

    public static ArrayList<ClassPcDTO> addClassToList(ClassCharacter classCharacter, Character character,
            String className) {

        ArrayList<ClassPcDTO> classPcListDTO = new ArrayList<ClassPcDTO>();

        for (ClassPcDTO classList : classPcListDTO) {
            boolean skipClassPc = false;

            if (className.equals(classCharacter.getName())) {
                classList.level = +1;
                skipClassPc = true;
            }

            if (!skipClassPc) {

                ClassPcDTO clPc = new ClassPcDTO();
                clPc.className.equals(classCharacter.getName());
                clPc.id = classCharacter.getId();
                clPc.level = 1;

            }
        }
        return classPcListDTO;
    }
}
