package pl.kolendateam.dadcard.race.dto;

import java.util.Set;
import pl.kolendateam.dadcard.feats.MapperFeats;
import pl.kolendateam.dadcard.feats.dto.FeatDTO;
import pl.kolendateam.dadcard.feats.entity.Feat;
import pl.kolendateam.dadcard.items.MapperItems;
import pl.kolendateam.dadcard.items.MapperItemsDTO;
import pl.kolendateam.dadcard.items.enchantment.dto.EnchantedItemsDTO;
import pl.kolendateam.dadcard.items.enchantment.entity.EnchantedItems;
import pl.kolendateam.dadcard.race.MapperRaceToDTO;
import pl.kolendateam.dadcard.race.entity.Deity;
import pl.kolendateam.dadcard.race.entity.LanguageEnum;
import pl.kolendateam.dadcard.race.entity.RacialRegion;
import pl.kolendateam.dadcard.race.entity.SubRace;
import pl.kolendateam.dadcard.spells.repository.SpellsRepository;

public class RacialRegionDTO {

  public int id;
  public String racialRegion;
  public RegionDTO region;
  public Set<SubRace> regionalSubRaces;
  public LanguageEnum[] automaticLanguages;
  public LanguageEnum[] bonusLanguages;
  public Set<DeityDTO> preferedDeities;
  public Set<FeatDTO> regionalFeats;
  public Set<EnchantedItemsDTO> regionalItemsOpOne;
  public Set<EnchantedItemsDTO> regionalItemsOpTwo;
  public Set<EnchantedItemsDTO> regionalItemsOpThree;

  public RacialRegionDTO(
    RacialRegion racialRegion,
    SpellsRepository spellsRepository
  ) {
    this.id = racialRegion.getId();
    this.racialRegion = racialRegion.getRacialRegion();
    this.region = new RegionDTO(racialRegion.getRegion());
    this.regionalSubRaces = racialRegion.getRegionalSubRaces();
    this.automaticLanguages = racialRegion.getAutomaticLanguages();
    this.bonusLanguages = racialRegion.getBonusLanguages();
    this.preferedDeities =
      MapperRaceToDTO.toDeityDTOSet(
        racialRegion.getPreferedDeities().stream().toList(),
        spellsRepository
      );
    this.regionalFeats =
      MapperFeats.toFeatsSetDTO(racialRegion.getRegionalFeats());
    this.regionalItemsOpOne =
      MapperItemsDTO.toEnchantedItemsSetDTO(
        racialRegion.getRegionalItemsOpOne()
      );
    racialRegion.getRegionalItemsOpOne();
    this.regionalItemsOpTwo =
      MapperItemsDTO.toEnchantedItemsSetDTO(
        racialRegion.getRegionalItemsOpTwo()
      );
    this.regionalItemsOpThree =
      MapperItemsDTO.toEnchantedItemsSetDTO(
        racialRegion.getRegionalItemsOpThree()
      );
  }
}
