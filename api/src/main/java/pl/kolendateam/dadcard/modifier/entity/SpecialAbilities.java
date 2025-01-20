package pl.kolendateam.dadcard.modifier.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@NoArgsConstructor
@Getter
@Setter
@Entity
@AllArgsConstructor
public class SpecialAbilities implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  String name;

  @Enumerated(EnumType.STRING)
  ModifierEnum type;

  String description;
  Integer dc;

  @JdbcTypeCode(SqlTypes.JSON)
  ModifierEnum[] dcAbility;

  Integer value;
  String target;
  String area;
}
