package pl.kolendateam.dadcard.race.dto;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.race.entity.Race;

@NoArgsConstructor
public class SubRaceBaseDTO {
    public int id;
    public String subRacesName;
    public String avatarUrl;

    public SubRaceBaseDTO(Race race){
        this.avatarUrl = race.getAvatarUrl();
        this.subRacesName = race.getSubRaceName();
        this.id = race.getId();
    }
}
