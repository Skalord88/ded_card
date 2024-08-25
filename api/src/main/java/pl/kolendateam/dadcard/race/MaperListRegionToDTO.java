package pl.kolendateam.dadcard.race;

import java.util.HashSet;
import java.util.Set;
import pl.kolendateam.dadcard.race.dto.RegionBaseDTO;
import pl.kolendateam.dadcard.race.entity.Region;

public class MaperListRegionToDTO {

  public static Set<RegionBaseDTO> toRegionBaseDTO(Set<Region> regions) {
    Set<RegionBaseDTO> regionsDTO = new HashSet<>();

    for (Region region : regions) {
      RegionBaseDTO tempRegion = new RegionBaseDTO(region);
      regionsDTO.add(tempRegion);
    }

    return regionsDTO;
  }
}
