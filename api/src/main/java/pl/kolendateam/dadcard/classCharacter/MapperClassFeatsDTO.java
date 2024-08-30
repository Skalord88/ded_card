package pl.kolendateam.dadcard.classCharacter;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPcListDTO;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPc;
import pl.kolendateam.dadcard.feats.dto.ClassFeatsDTO;
import pl.kolendateam.dadcard.feats.entity.ClassFeats;

public class MapperClassFeatsDTO {

  public static Set<ClassFeatsDTO> toListClassFeatDTO(Set<ClassFeats> feats) {
    Set<ClassFeatsDTO> featsDTO = new HashSet<>();
    if (feats != null) {
      feats.forEach(f -> {
        ClassFeatsDTO featDTO = new ClassFeatsDTO(f);
        featsDTO.add(featDTO);
      });
    }
    Set<ClassFeatsDTO> sortedFeatsDTO = featsDTO
      .stream()
      .sorted(Comparator.comparingInt(ClassFeatsDTO::getLevel))
      .collect(Collectors.toCollection(LinkedHashSet::new));

    return sortedFeatsDTO;
  }

  public static ArrayList<ClassPcListDTO> toClassPcListDTO(
    List<ClassPc> classPcArray
  ) {
    ArrayList<ClassPcListDTO> classesDTO = new ArrayList<>();

    if (classPcArray != null) {
      for (ClassPc classPc : classPcArray) {
        ClassPcListDTO classPcListDTO = new ClassPcListDTO(
          classPc.getClassCharacter().getId(),
          classPc.getClassCharacter().getType().toString(),
          classPc.getClassCharacter().getName().toString(),
          classPc.getLevel(),
          classPc.getFirstClass(),
          classPc.getClassCharacter().getHitDice(),
          classPc.getClassCharacter().getClassBab(),
          classPc.getClassCharacter().getSavingThrow(),
          classPc.getClassCharacter().getSkillPoints(),
          MapperClassFeatsDTO.toListClassFeatDTO(
            classPc.getClassCharacter().getAvailableFeats()
          )
        );
        classesDTO.add(classPcListDTO);
      }
    }
    return classesDTO;
  }
}
// public static ArrayList <ClassFeatsDTO> toClassFeatsDTO(String classFeatsMap){
//     ArrayList<ClassFeatsDTO> clFeatsList = new ArrayList<>();
//     Gson gson = new Gson();
//     Type listFeats = new TypeToken<List<ClassFeats>>(){}.getType();
//     List<ClassFeats> feats = gson.fromJson(classFeatsMap, listFeats);
//     for(ClassFeats clFe : feats){
//         ClassFeatsDTO clFeDTO = new ClassFeatsDTO();
//         clFeDTO.level =  clFe.getLevel();
//         HashSet <String> fList = clFe.getClassFeats();
//         for(String f : fList){
//             fList.add(f);
//             clFeDTO.classFeats = fList;
//         }
//         clFeatsList.add(clFeDTO);
//     }
//     return clFeatsList;
// }
