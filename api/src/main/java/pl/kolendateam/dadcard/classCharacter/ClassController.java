package pl.kolendateam.dadcard.classCharacter;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pl.kolendateam.dadcard.classCharacter.dto.ClassCharacterDTO;
import pl.kolendateam.dadcard.classCharacter.entity.ClassCharacter;
import pl.kolendateam.dadcard.classCharacter.repository.ClassRepository;

@CrossOrigin
@RestController
@RequestMapping("class")
public class ClassController {

  ClassRepository classRepository;

  @Autowired
  ClassController(ClassRepository classRepository) {
    this.classRepository = classRepository;
  }

  @GetMapping("")
  public List<ClassCharacterDTO> getAll() {
    List<ClassCharacter> classes = this.classRepository.findAll();

    return MapperClassCharacter.toClassCharacterListDTO(classes);
  }

  @GetMapping(value = { "/{id}" })
  public ClassCharacterDTO getOneClass(@PathVariable int id) {
    Optional<ClassCharacter> classOpt = this.classRepository.findById(id);

    if (!classOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Character Not Found"
      );
    }

    ClassCharacter oneClass = classOpt.get();

    return MapperClassCharacter.toClassCharacterDTO(oneClass);
  }
}
