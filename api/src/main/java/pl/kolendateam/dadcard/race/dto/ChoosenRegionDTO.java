package pl.kolendateam.dadcard.race.dto;

import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.race.entity.ChoosenRegion;

@NoArgsConstructor
@AllArgsConstructor
public class ChoosenRegionDTO {

  public int id;

  public Set<Integer> bonusLanguages;

  public Integer preferedDeities;

  public Integer regionalFeats;

  public Set<Integer> regionalItems;

  public Integer regionalAlignment;

  public ChoosenRegionDTO(ChoosenRegion choosenRegion) {
    this.id = choosenRegion.getId();
    this.bonusLanguages = choosenRegion.getBonusLanguages();
    this.preferedDeities = choosenRegion.getPreferedDeities();
    this.regionalFeats = choosenRegion.getRegionalFeats();
    this.regionalItems = choosenRegion.getRegionalItems();
    this.regionalAlignment = choosenRegion.getRegionalAlignment();
  }
}
