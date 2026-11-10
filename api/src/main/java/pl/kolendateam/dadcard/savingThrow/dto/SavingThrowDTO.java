package pl.kolendateam.dadcard.savingThrow.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;
import pl.kolendateam.dadcard.savingThrow.entity.Resistance;
import pl.kolendateam.dadcard.savingThrow.entity.SavingThrow;

@AllArgsConstructor
@NoArgsConstructor
public class SavingThrowDTO {

  public int fortitude;
  public int reflex;
  public int will;
  public Resistance[] resistance;

  @Enumerated(EnumType.STRING)
  public ModifierEnum modifierType;

  public SavingThrowDTO(SavingThrow savingThrow) {
    this.fortitude = savingThrow.getFortitude();
    this.reflex = savingThrow.getReflex();
    this.will = savingThrow.getWill();
    this.resistance =
      savingThrow.getResistance() != null ? savingThrow.getResistance() : null;
    this.modifierType =
      savingThrow.getModifierType() != null
        ? savingThrow.getModifierType()
        : null;
  }
}
