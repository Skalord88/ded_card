package pl.kolendateam.dadcard.feats.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.modifier.entity.ModifierBonus;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Feats implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  String featName;

  @Enumerated(EnumType.STRING)
  FeatsTypeEnum featsType;

  String description;

  @JdbcTypeCode(SqlTypes.JSON)
  List<Prerequisite> prerequisite = new ArrayList<>();

  @JdbcTypeCode(SqlTypes.JSON)
  Set<ModifierBonus> modifiers;

  public Feats(int idDTO) {
    this.id = idDTO;
  }
}
