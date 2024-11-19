package pl.kolendateam.dadcard.spells.dto;

import pl.kolendateam.dadcard.spells.entity.School;
import pl.kolendateam.dadcard.spells.entity.SpellsEnum;

public class SchoolDTO {

  public int id;
  public SpellsEnum school;

  public SchoolDTO(School sc) {
    this.id = sc.getId();
    this.school = sc.getSchool();
  }
}
