package pl.kolendateam.dadcard.race.dto;

import com.google.gson.Gson;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.race.entity.Race;

@NoArgsConstructor
public class SubRaceBaseDTO {
    public int id;
    public String subRacesName;
    public String avatarUrl;
    public Abilitys raceAbilitys;

    public SubRaceBaseDTO(Race race){
        this.avatarUrl = race.getAvatarUrl();
        this.subRacesName = race.getSubRaceName();
        this.id = race.getId();
        Gson gson = new Gson();
        Abilitys jsonObjectAbilitys = gson.fromJson(race.getAbilitys(), Abilitys.class);
        this.raceAbilitys = jsonObjectAbilitys;
    }
}
