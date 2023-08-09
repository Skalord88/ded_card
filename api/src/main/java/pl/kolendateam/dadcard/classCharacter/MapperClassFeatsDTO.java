package pl.kolendateam.dadcard.classCharacter;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import pl.kolendateam.dadcard.feats.dto.ClassFeatsDTO;
import pl.kolendateam.dadcard.feats.entity.ClassFeats;

public class MapperClassFeatsDTO {
    public static ArrayList <ClassFeatsDTO> toClassFeatsDTO(String classFeatsMap){

        ArrayList<ClassFeatsDTO> clFeatsList = new ArrayList<>();

        Gson gson = new Gson();
        Type listFeats = new TypeToken<List<ClassFeats>>(){}.getType();
        List<ClassFeats> feats = gson.fromJson(classFeatsMap, listFeats);

        for(ClassFeats clFe : feats){
            ClassFeatsDTO clFeDTO = new ClassFeatsDTO();
            clFeDTO.level =  clFe.getLevel();
            HashSet <String> fList = clFe.getClassFeats();
            for(String f : fList){
                fList.add(f);
                clFeDTO.classFeats = fList;
            }
            
            clFeatsList.add(clFeDTO);
        }

        return clFeatsList;
    }
}
