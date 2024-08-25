package pl.kolendateam.dadcard.modifier.entity;

import java.io.Serializable;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ModifierBonus implements Serializable {

  ModifierEnum modifier;

  int bonus;

  @JdbcTypeCode(SqlTypes.JSON)
  ModifierEnum[] targets;
}
