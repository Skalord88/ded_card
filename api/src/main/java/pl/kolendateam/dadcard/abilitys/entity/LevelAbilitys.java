package pl.kolendateam.dadcard.abilitys.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class LevelAbilitys {

  int level;
  int[] abilitys;

  public LevelAbilitys(int lv, int[] abs) {
    this.level = lv;
    this.abilitys = abs;
  }
}
