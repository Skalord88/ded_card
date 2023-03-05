package pl.kolendateam.dadcard.clas;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("class")
public class ClassController {

    ClassRepository classRepository;

    @Autowired
    ClassController(ClassRepository classRepository) {
        this.classRepository = classRepository;
    }

    @GetMapping("")
    public ArrayList<ClassTypeBaseDTO> getAll() {
        List<CLass> classes = this.classRepository.findAll();

        return MaperListClassTypeToDTO.toClassTypeBaseDTO(classes);
    }
    
}
