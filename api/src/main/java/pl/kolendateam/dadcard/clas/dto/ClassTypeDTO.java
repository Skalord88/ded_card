package pl.kolendateam.dadcard.clas.dto;

import java.util.ArrayList;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class ClassTypeDTO {

    public String classType;

    public ArrayList<ClassDTO> classes;

    public ClassTypeBaseDTO(Class class){
        this.avatarClassUrl = class.getAvatarUrl();
        this.raceName = class.getRacesName();
        SubRaceBaseDTO tempSubRace = new SubRaceBaseDTO(race);
        this.subRaces = new ArrayList<SubRaceBaseDTO>();
        this.subRaces.add(tempSubRace);
    }
    
}
