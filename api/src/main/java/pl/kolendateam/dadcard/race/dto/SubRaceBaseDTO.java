package pl.kolendateam.dadcard.race.dto;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.armorClass.entity.ArmorClass;
import pl.kolendateam.dadcard.race.entity.Race;
import pl.kolendateam.dadcard.size.MapperSizeToDTO;
import pl.kolendateam.dadcard.size.dto.SizeDTO;
import pl.kolendateam.dadcard.skills.MapperSkillsToDTO;
import pl.kolendateam.dadcard.skills.dto.RaceSkillsDTO;
import pl.kolendateam.dadcard.skills.entity.ClassSkills;

@NoArgsConstructor
public class SubRaceBaseDTO {

  public short id;
  public String subRacesName;
  public String avatarUrl;
  public Abilitys raceAbilitys;
  public ArrayList<RaceSkillsDTO> raceSkills;
  public ArmorClass armorClass;
  public int levelAdjustment;
  public SizeDTO size;

  public SubRaceBaseDTO(Race race) {
    this.avatarUrl = race.getAvatarUrl();
    this.subRacesName = race.getSubRaceName();
    this.id = race.getId();
    Gson gson = new Gson();
    Abilitys jsonObjectAbilitys = gson.fromJson(
      race.getAbilitys(),
      Abilitys.class
    );
    this.raceAbilitys = jsonObjectAbilitys;
    Type listRaceSkill = new TypeToken<List<ClassSkills>>() {}.getType();
    ArrayList<ClassSkills> raceSkill = gson.fromJson(
      race.getSkills(),
      listRaceSkill
    );
    if (raceSkill == null) {
      this.raceSkills = null;
    } else {
      this.raceSkills = MapperSkillsToDTO.toRaceSkillsDTO(raceSkill);
    }
    if (race.getArmorClass() == null) {
      this.armorClass = null;
    } else {
      ArmorClass jsonObjectArmorClass = gson.fromJson(
        race.getArmorClass(),
        ArmorClass.class
      );
      this.armorClass = jsonObjectArmorClass;
    }
    this.levelAdjustment = race.getLevelAdjustment();
    this.size = MapperSizeToDTO.toSizeDTO(race.getSize());
  }
}
