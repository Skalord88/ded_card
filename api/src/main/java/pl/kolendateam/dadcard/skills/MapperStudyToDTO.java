package pl.kolendateam.dadcard.skills;

import java.util.HashSet;
import java.util.Set;
import pl.kolendateam.dadcard.skills.dto.StudyDTO;
import pl.kolendateam.dadcard.skills.entity.ClassStudy;

public class MapperStudyToDTO {

  public static Set<StudyDTO> toStudyListDTO(Set<ClassStudy> listStudy) {
    Set<StudyDTO> listOfStudyDTO = new HashSet<>();
    if (listStudy != null) {
      listStudy.forEach(st -> {
        StudyDTO stListDTO = new StudyDTO(st);
        listOfStudyDTO.add(stListDTO);
      });
    }
    return listOfStudyDTO;
  }
}
