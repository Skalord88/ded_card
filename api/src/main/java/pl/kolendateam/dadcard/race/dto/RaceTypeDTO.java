package pl.kolendateam.dadcard.race.dto;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.classCharacter.dto.ClassCharacterDTO;
import pl.kolendateam.dadcard.race.entity.RaceType;

@NoArgsConstructor
public class RaceTypeDTO {

  public int id;
  public ClassCharacterDTO raceClass;
  public int level;

  public RaceTypeDTO(RaceType raceTypes) {
    this.id = raceTypes.getId();
    this.raceClass = new ClassCharacterDTO(raceTypes.getRaceClass());
    this.level = raceTypes.getLevel();
  }
}
