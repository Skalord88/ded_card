package pl.kolendateam.dadcard.size.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.modifier.entity.ModifierBonus;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Size implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  @Enumerated(EnumType.STRING)
  SizeEnum size;

  @JdbcTypeCode(SqlTypes.JSON)
  Set<ModifierBonus> modifiers = new HashSet<>();

  public Size(int n) {
    this.id = n;
  }
}
