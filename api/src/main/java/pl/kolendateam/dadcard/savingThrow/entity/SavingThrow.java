package pl.kolendateam.dadcard.savingThrow.entity;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.io.Serializable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;
import pl.kolendateam.dadcard.savingThrow.dto.SavingThrowDTO;

@Setter
@Getter
@NoArgsConstructor
public class SavingThrow implements Serializable {

  int fortitude;
  int reflex;
  int will;

  @Enumerated(EnumType.STRING)
  ModifierEnum modifierBonus;

  @JdbcTypeCode(SqlTypes.JSON)
  Resistance[] resistance;

  public SavingThrow(SavingThrowDTO saving) {
    this.fortitude = saving.fortitude;
    this.reflex = saving.reflex;
    this.will = saving.will;
    this.resistance = saving.resistance != null ? saving.resistance : null;
    this.modifierBonus =
      saving.modifierBonus != null ? saving.modifierBonus : null;
  }

  public boolean checkPrerequisiteST(SavingThrow savingThrow) {
    return (
      fortitude >= savingThrow.fortitude ||
      reflex >= savingThrow.reflex ||
      will >= savingThrow.will
    );
  }
}
