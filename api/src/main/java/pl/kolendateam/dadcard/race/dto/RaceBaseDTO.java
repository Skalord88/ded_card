package pl.kolendateam.dadcard.race.dto;

import java.util.ArrayList;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.race.entity.Race;

@NoArgsConstructor
public class RaceBaseDTO {
    public String raceName;
    public String avatarRaceUrl;

    public ArrayList<SubRaceBaseDTO> subRaces;


    public RaceBaseDTO(Race race){
        this.avatarRaceUrl = race.getAvatarUrl();
        this.raceName = race.getRacesName();
        SubRaceBaseDTO tempSubRace = new SubRaceBaseDTO(race);
        this.subRaces = new ArrayList<SubRaceBaseDTO>();
        this.subRaces.add(tempSubRace);
    }
}
