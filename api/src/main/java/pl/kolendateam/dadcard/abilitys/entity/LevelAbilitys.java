package pl.kolendateam.dadcard.abilitys.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.abilitys.MapperAbilitys;
import pl.kolendateam.dadcard.abilitys.dto.LevelAbilitysDTO;

@Setter
@Getter
@NoArgsConstructor
public class LevelAbilitys {

  int level;
  Abilitys abilitys;

  public LevelAbilitys(int lv, Abilitys abs) {
    this.level = lv;
    this.abilitys = abs;
  }

  public LevelAbilitys(LevelAbilitysDTO lvAb) {
    this.level = lvAb.level;
    this.abilitys = MapperAbilitys.toAbility(lvAb.abilitys);
  }
}
