package pl.kolendateam.dadcard.race.dto;

import java.util.Set;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.feats.MapperFeatsDTO;
import pl.kolendateam.dadcard.feats.dto.FeatsDTO;
import pl.kolendateam.dadcard.modifier.MapperModifierBonus;
import pl.kolendateam.dadcard.modifier.dto.ModifierDTO;
import pl.kolendateam.dadcard.race.MaperListRegionToDTO;
import pl.kolendateam.dadcard.race.MapperRaceToDTO;
import pl.kolendateam.dadcard.race.entity.SubRace;
import pl.kolendateam.dadcard.size.MapperSizeToDTO;
import pl.kolendateam.dadcard.size.dto.SizeDTO;

@NoArgsConstructor
public class SubRaceDTO {

  public int id;
  public RaceDTO race;
  public String subRacesName;
  public String avatarUrl;
  public Set<ModifierDTO> modifiers;
  public Set<FeatsDTO> raceFeats;
  public int levelAdjustment;
  public SizeDTO size;
  public Set<RegionBaseDTO> availableRegions;

  // public Abilitys raceAbilitys;
  // public ArrayList<RaceSkillsDTO> raceSkills;
  // public ArmorClass armorClass;

  public SubRaceDTO(SubRace subRace) {
    this.id = subRace.getId();
    this.race = MapperRaceToDTO.toRaceDTO(subRace.getRace());
    this.subRacesName = subRace.getSubRaceName();
    this.avatarUrl = subRace.getAvatarUrl();
    this.modifiers =
      MapperModifierBonus.toListModifierDTO(subRace.getModifiers());
    this.raceFeats = MapperFeatsDTO.toFeatsSetDTO(subRace.getSubRaceFeats());
    this.levelAdjustment = subRace.getLevelAdjustment();
    this.size = MapperSizeToDTO.toSizeDTO(subRace.getSize());
    this.availableRegions =
      MaperListRegionToDTO.toRegionBaseDTO(subRace.getAvailableRegions());
    // Gson gson = new Gson();
    // Abilitys jsonObjectAbilitys = gson.fromJson(
    //   race.getAbilitys(),
    //   Abilitys.class
    // );
    // this.raceAbilitys = jsonObjectAbilitys;
    // Type listRaceSkill = new TypeToken<List<ClassSkills>>() {}.getType();
    // ArrayList<ClassSkills> raceSkill = gson.fromJson(
    //   race.getSkills(),
    //   listRaceSkill
    // );
    // if (raceSkill == null) {
    //   this.raceSkills = null;
    // } else {
    //   this.raceSkills = MapperSkillsToDTO.toRaceSkillsDTO(raceSkill);
    // }
    // if (race.getArmorClass() == null) {
    //   this.armorClass = null;
    // } else {
    //   ArmorClass jsonObjectArmorClass = gson.fromJson(
    //     race.getArmorClass(),
    //     ArmorClass.class
    //   );
    //   this.armorClass = jsonObjectArmorClass;
    // }
  }
}
