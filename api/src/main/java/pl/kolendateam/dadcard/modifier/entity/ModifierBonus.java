package pl.kolendateam.dadcard.modifier.entity;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.modifier.dto.ModifierDTO;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ModifierBonus implements Serializable {

  ModifierEnum modifier;
  int bonus;

  @JdbcTypeCode(SqlTypes.JSON)
  ModifierEnum[] selected;

  @JdbcTypeCode(SqlTypes.JSON)
  ModifierEnum[] targets;

  public ModifierBonus(ModifierDTO mod) {
    this.modifier = mod.modifier;
    this.bonus = mod.bonus;
    this.selected = mod.selected;
    this.targets = mod.targets;
  }
}
