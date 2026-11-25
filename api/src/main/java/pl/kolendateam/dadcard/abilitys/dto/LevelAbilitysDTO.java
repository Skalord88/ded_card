package pl.kolendateam.dadcard.abilitys.dto;

import lombok.ToString;
import pl.kolendateam.dadcard.abilitys.MapperAbilitys;
import pl.kolendateam.dadcard.abilitys.entity.LevelAbilitys;

@ToString
public class LevelAbilitysDTO {

  public int level;
  public AbilitysDTO abilitys;

  public LevelAbilitysDTO(int lv, AbilitysDTO abs) {
    this.level = lv;
    this.abilitys = abs;
  }

  public LevelAbilitysDTO() {}

  public LevelAbilitysDTO(LevelAbilitys levelAbilities) {
    this.level = levelAbilities.getLevel();
    this.abilitys = MapperAbilitys.toAbilityDTO(levelAbilities.getAbilitys());
  }
}
