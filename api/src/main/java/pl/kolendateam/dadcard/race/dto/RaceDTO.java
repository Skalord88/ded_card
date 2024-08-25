package pl.kolendateam.dadcard.race.dto;

import java.util.Set;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.feats.MapperFeatsDTO;
import pl.kolendateam.dadcard.feats.dto.FeatsDTO;
import pl.kolendateam.dadcard.modifier.MapperModifierBonusDTO;
import pl.kolendateam.dadcard.modifier.dto.ModifierDTO;
import pl.kolendateam.dadcard.race.entity.Race;

@NoArgsConstructor
public class RaceDTO {

  public int id;
  public String raceName;
  public String avatarRaceUrl;
  public Set<ModifierDTO> modifiers;
  public Set<FeatsDTO> feats;

  // public ArrayList<SubRaceBaseDTO> subRaces;

  public RaceDTO(Race race) {
    this.id = race.getId();
    this.avatarRaceUrl = race.getAvatarUrl();
    this.raceName = race.getRaceName();
    this.modifiers =
      MapperModifierBonusDTO.toListModifierDTO(race.getModifiers());
    this.feats = MapperFeatsDTO.toFeatsSetDTO(race.getRaceFeats());
    // SubRaceBaseDTO tempSubRace = new SubRaceBaseDTO(race);
    // this.subRaces = new ArrayList<SubRaceBaseDTO>();
    // this.subRaces.add(tempSubRace);
  }
}
