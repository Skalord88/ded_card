package pl.kolendateam.dadcard.race.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.race.entity.ChoosenRegion;
import pl.kolendateam.dadcard.race.entity.LanguageEnum;

@NoArgsConstructor
@AllArgsConstructor
public class ChoosenRegionDTO {

  public int id;

  public LanguageEnum[] bonusLanguages;

  public Integer preferedDeities;

  public Integer regionalFeats;

  public Integer[] regionalItems;

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
