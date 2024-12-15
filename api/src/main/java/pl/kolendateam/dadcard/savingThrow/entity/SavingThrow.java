package pl.kolendateam.dadcard.savingThrow.entity;

import java.io.Serializable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.savingThrow.dto.SavingThrowDTO;

@Setter
@Getter
@NoArgsConstructor
public class SavingThrow implements Serializable {

  int fortitude;
  int reflex;
  int will;

  @JdbcTypeCode(SqlTypes.JSON)
  Resistance[] resistance;

  public SavingThrow(SavingThrowDTO saving) {
    this.fortitude = saving.fortitude;
    this.reflex = saving.reflex;
    this.will = saving.will;
    this.resistance = saving.resistance;
  }

  public boolean checkPrerequisiteST(SavingThrow savingThrow) {
    return (
      fortitude >= savingThrow.fortitude ||
      reflex >= savingThrow.reflex ||
      will >= savingThrow.will
    );
  }
}
