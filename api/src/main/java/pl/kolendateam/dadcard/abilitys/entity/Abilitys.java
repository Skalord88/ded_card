package pl.kolendateam.dadcard.abilitys.entity;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.io.Serializable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.abilitys.dto.AbilitysDTO;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;

@Setter
@Getter
@NoArgsConstructor
public class Abilitys implements Serializable {

  int strength;
  int dexterity;
  int constitution;
  int intelligence;
  int wisdom;
  int charisma;

  @Enumerated(EnumType.STRING)
  ModifierEnum modifierBonus;

  public void setCharacterAbility(AbilitysDTO abilitysDTO) {
    this.strength = abilitysDTO.strength;
    this.dexterity = abilitysDTO.dexterity;
    this.constitution = abilitysDTO.constitution;
    this.intelligence = abilitysDTO.intelligence;
    this.wisdom = abilitysDTO.wisdom;
    this.charisma = abilitysDTO.charisma;
    this.modifierBonus =
      abilitysDTO.modifierBonus == null ? null : abilitysDTO.modifierBonus;
  }

  public Abilitys addRaceAbilitys(
    Abilitys jsonObjectAbilitys,
    Abilitys abilitys
  ) {
    abilitys.strength += jsonObjectAbilitys.strength;
    abilitys.dexterity += jsonObjectAbilitys.dexterity;
    abilitys.constitution += jsonObjectAbilitys.constitution;
    abilitys.intelligence += jsonObjectAbilitys.intelligence;
    abilitys.wisdom += jsonObjectAbilitys.wisdom;
    abilitys.charisma += jsonObjectAbilitys.charisma;

    return abilitys;
  }

  public boolean checkPrerequisiteAb(Abilitys abilitys) {
    return (
      strength >= abilitys.strength &&
      dexterity >= abilitys.dexterity &&
      constitution >= abilitys.constitution &&
      intelligence >= abilitys.intelligence &&
      wisdom >= abilitys.wisdom &&
      charisma >= abilitys.charisma
    );
  }

  public Abilitys(AbilitysDTO abilitysDTO) {
    this.strength = abilitysDTO.strength;
    this.dexterity = abilitysDTO.dexterity;
    this.constitution = abilitysDTO.constitution;
    this.intelligence = abilitysDTO.intelligence;
    this.wisdom = abilitysDTO.wisdom;
    this.charisma = abilitysDTO.charisma;
  }
}
