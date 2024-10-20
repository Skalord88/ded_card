package pl.kolendateam.dadcard.spells.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.io.Serializable;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.feats.entity.Prerequisite;
import pl.kolendateam.dadcard.modifier.entity.ModifierBonus;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Domains implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  String domain;
  String grantedPower;

  @JdbcTypeCode(SqlTypes.JSON)
  List<Prerequisite> listOfSpells;

  @JdbcTypeCode(SqlTypes.JSON)
  Set<ModifierBonus> modifiers;
}
