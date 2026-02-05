package pl.kolendateam.dadcard.race.dto;

import java.util.HashSet;
import java.util.Set;

public class AddRegionDTO {

  public int idCharacter;
  public int idRegion;
  public int idDeity;
  public Set<Integer> idDomains = new HashSet<>();
  public int idAligment;

  @Override
  public String toString() {
    return (
      "AddRegionDTO{" +
      "idCharacter=" +
      idCharacter +
      ", " +
      "idRegion=" +
      idRegion +
      ", idDeity=" +
      idDeity +
      ", idDomains=" +
      idDomains +
      ", idAligment=" +
      idAligment +
      '}'
    );
  }
}
