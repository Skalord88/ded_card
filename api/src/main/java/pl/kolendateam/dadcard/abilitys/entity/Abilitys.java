package pl.kolendateam.dadcard.abilitys.entity;

import java.io.Serializable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.abilitys.dto.AbilitysDTO;

@Setter
@Getter
@NoArgsConstructor
public class Abilitys implements Serializable {

  int strength;
  int dextrity;
  int constitution;
  int intelligence;
  int wisdom;
  int charisma;

  public void setCharacterAbility(AbilitysDTO abilitysDTO) {
    strength = abilitysDTO.strength;
    dextrity = abilitysDTO.dextrity;
    constitution = abilitysDTO.constitution;
    intelligence = abilitysDTO.intelligence;
    wisdom = abilitysDTO.wisdom;
    charisma = abilitysDTO.charisma;
  }

  public int bonusStreght(Abilitys abilitys) {
    int bonusStreght = (int) (abilitys.getStrength() - 10) / 2;
    return bonusStreght;
  }

  public int bonusDextrity(Abilitys abilitys) {
    int bonusDextrity = (int) (abilitys.getDextrity() - 10) / 2;
    return bonusDextrity;
  }

  public int bonusConstitution(Abilitys abilitys) {
    int bonusConstitution = (abilitys.getConstitution() - 10) / 2;
    return bonusConstitution;
  }

  public int bonusIntelligence(Abilitys abilitys) {
    int bonusIntelligence = (int) (abilitys.getIntelligence() - 10) / 2;
    return bonusIntelligence;
  }

  public int bonusWisdom(Abilitys abilitys) {
    int bonusWisdom = (int) (abilitys.getWisdom() - 10) / 2;
    return bonusWisdom;
  }

  public int bonusCharisma(Abilitys abilitys) {
    int bonusCharisma = (int) (abilitys.getCharisma() - 10) / 2;
    return bonusCharisma;
  }

  public Abilitys addRaceAbilitys(
    Abilitys jsonObjectAbilitys,
    Abilitys abilitys
  ) {
    abilitys.strength += jsonObjectAbilitys.strength;
    abilitys.dextrity += jsonObjectAbilitys.dextrity;
    abilitys.constitution += jsonObjectAbilitys.constitution;
    abilitys.intelligence += jsonObjectAbilitys.intelligence;
    abilitys.wisdom += jsonObjectAbilitys.wisdom;
    abilitys.charisma += jsonObjectAbilitys.charisma;

    return abilitys;
  }

  public boolean checkPrerequisiteAb(Abilitys abilitys) {
    return (
      strength >= abilitys.strength &&
      dextrity >= abilitys.dextrity &&
      constitution >= abilitys.constitution &&
      intelligence >= abilitys.intelligence &&
      wisdom >= abilitys.wisdom &&
      charisma >= abilitys.charisma
    );
  }
}
