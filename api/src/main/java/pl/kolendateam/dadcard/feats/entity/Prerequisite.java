package pl.kolendateam.dadcard.feats.entity;

import java.io.Serializable;
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
public class Prerequisite implements Serializable {

  @JdbcTypeCode(SqlTypes.JSON)
  PrerequisiteEnum type;

  int value;
}
