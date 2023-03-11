package pl.kolendateam.dadcard.race.dto;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.race.entity.Region;

@NoArgsConstructor
public class RegionBaseDTO {
    public int id;
    public String name;

    public RegionBaseDTO(Region region){
        this.id = region.getId();
        this.name = region.getName();
    }
}
