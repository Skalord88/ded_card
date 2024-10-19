package pl.kolendateam.dadcard.feats.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
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
@Table(name = "feats")
public class Feats implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  String featName;
  String prerequisites;
  String benefit;
  String normal;
  String special;

  @JdbcTypeCode(SqlTypes.JSON)
  Set<ModifierBonus> modifiers = new HashSet<>();

  // @Enumerated(EnumType.STRING)
  // FeatsTypeEnum[] featsType;

  // @JdbcTypeCode(SqlTypes.JSON)
  // List<Prerequisite> prerequisite = new ArrayList<>();

  public Feats(int idDTO) {
    this.id = idDTO;
  }
}
