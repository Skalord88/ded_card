package pl.kolendateam.dadcard.race;

import java.util.ArrayList;
import java.util.List;

import pl.kolendateam.dadcard.race.dto.RaceBaseDTO;
import pl.kolendateam.dadcard.race.dto.SubRaceBaseDTO;
import pl.kolendateam.dadcard.race.entity.Race;

public class MaperListRaceToDTO {
    public static ArrayList<RaceBaseDTO> raceToRaceBaseDTO(List<Race> races){

        ArrayList<RaceBaseDTO> racesDTO = new ArrayList();

        for (Race race : races) {
            boolean skipCreateRaceDTO = false;

            for (RaceBaseDTO raceDTO : racesDTO) {
                if (raceDTO.raceName.equals(race.getRacesName())) { 
                    SubRaceBaseDTO tempSubRace = new SubRaceBaseDTO(race);
                    raceDTO.subRaces.add(tempSubRace);
                    skipCreateRaceDTO = true;
                }
            }

            if(!skipCreateRaceDTO){
                RaceBaseDTO tempRace = new RaceBaseDTO(race);
                racesDTO.add(tempRace);
            }
        }

        return racesDTO;
    }
}
