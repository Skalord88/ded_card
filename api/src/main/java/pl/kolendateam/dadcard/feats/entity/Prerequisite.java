package pl.kolendateam.dadcard.feats.entity;

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
public class Prerequisite implements Serializable {

  @JdbcTypeCode(SqlTypes.JSON)
  ModifierEnum type;

  int value;
}
