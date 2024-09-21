package pl.kolendateam.dadcard.race.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.feats.entity.Feats;
import pl.kolendateam.dadcard.modifier.entity.ModifierBonus;

@NoArgsConstructor
@Getter
@Setter
@Entity
@AllArgsConstructor
public class Race implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  String raceName;

  String avatarUrl;

  @JdbcTypeCode(SqlTypes.JSON)
  Set<ModifierBonus> modifiers;

  @ManyToMany
  @JoinTable(
    name = "race_feats",
    joinColumns = @JoinColumn(name = "race_id"),
    inverseJoinColumns = @JoinColumn(name = "feats_id")
  )
  Set<Feats> raceFeats = new HashSet<>();

  public Race(int n) {
    this.id = n;
  }
}
