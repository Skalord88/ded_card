package pl.kolendateam.dadcard.race.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
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
import pl.kolendateam.dadcard.size.entity.Size;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SubRace implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  String subRaceName;

  @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
  @JoinColumn(name = "race_id", referencedColumnName = "id")
  Race race;

  @OneToOne
  @JoinColumn(name = "size_id", referencedColumnName = "id")
  Size size;

  String avatarUrl;

  @JdbcTypeCode(SqlTypes.JSON)
  Set<ModifierBonus> modifiers = new HashSet<>();

  @ManyToMany
  @JoinTable(
    name = "sub_race_feats",
    joinColumns = @JoinColumn(name = "sub_race_id"),
    inverseJoinColumns = @JoinColumn(name = "feats_id")
  )
  Set<Feats> subRaceFeats = new HashSet<>();

  @ManyToMany
  @JoinTable(
    name = "race_region",
    joinColumns = @JoinColumn(name = "sub_race_id"),
    inverseJoinColumns = @JoinColumn(name = "region_id")
  )
  Set<Region> availableRegions = new HashSet<>();

  byte levelAdjustment;
}
