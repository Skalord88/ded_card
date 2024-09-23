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
public class Archetype implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  String archetypeName;

  @JdbcTypeCode(SqlTypes.JSON)
  Set<ModifierBonus> modifiers;

  @ManyToMany
  @JoinTable(
    name = "archetype_feats",
    joinColumns = @JoinColumn(name = "archetype_id"),
    inverseJoinColumns = @JoinColumn(name = "feats_id")
  )
  Set<Feats> archetypeFeats = new HashSet<>();

  byte levelAdjustment;

  String avatarUrl;
}
