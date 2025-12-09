package pl.kolendateam.dadcard.race.dto;

import java.util.Set;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.race.MapperRaceToDTO;
import pl.kolendateam.dadcard.race.entity.Region;

@NoArgsConstructor
public class RegionDTO {

  public int id;
  public String name;
  public Set<AlignmentDTO> regionalAlignment;
  public String description;

  public RegionDTO(Region region) {
    this.id = region.getId();
    this.name = region.getName();
    this.regionalAlignment =
      MapperRaceToDTO.toAlignmentDTOSet(region.getRegionalAlignment());
    this.description = region.getDescription();
  }
}
