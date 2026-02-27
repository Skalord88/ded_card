package pl.kolendateam.dadcard.savingThrow.entity;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Resistance implements Serializable {

  @Enumerated(EnumType.STRING)
  ModifierEnum type;

  @JdbcTypeCode(SqlTypes.JSON)
  ModifierEnum[] target;

  Integer bonus;
  // vs SAVING POISON 2
}
