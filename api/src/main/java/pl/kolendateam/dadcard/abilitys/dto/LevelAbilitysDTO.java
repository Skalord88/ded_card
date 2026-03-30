package pl.kolendateam.dadcard.abilitys.dto;

public class LevelAbilitysDTO {

  public int level;
  public int[] abilitys;

  public LevelAbilitysDTO(int lv, int[] abs) {
    this.level = lv;
    this.abilitys = abs;
  }

  public LevelAbilitysDTO() {}
}
