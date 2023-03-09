package pl.kolendateam.dadcard.race;

import java.util.ArrayList;
import java.util.List;

import pl.kolendateam.dadcard.race.dto.RegionBaseDTO;
import pl.kolendateam.dadcard.race.dto.SubRaceBaseDTO;
import pl.kolendateam.dadcard.race.entity.Region;

public class MaperListRegionToDTO {
    public static ArrayList<RegionBaseDTO> toRegionBaseDTO(List<Region> regions){

        ArrayList<RegionBaseDTO> regionsDTO = new ArrayList();

        for (Region region : regions) {
            RegionBaseDTO tempRegion = new RegionBaseDTO(region);
            regionsDTO.add(tempRegion);
        }

        return regionsDTO;
    }
}
