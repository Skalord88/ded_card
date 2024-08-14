package pl.kolendateam.dadcard.race.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.size.entity.Size;

@NoArgsConstructor
@Getter
@Setter
@RequiredArgsConstructor
@Entity
public class Race {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  short id;

  @NonNull
  String racesName;

  @NonNull
  String subRaceName;

  @NonNull
  String avatarUrl;

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "size_id", referencedColumnName = "id")
  Size size;

  int speed;

  @NonNull
  String abilitys;

  @NonNull
  String skills;

  String armorClass;

  byte levelAdjustment;

  @ManyToMany
  @JoinTable(
    name = "race_region",
    joinColumns = @JoinColumn(name = "race_id"),
    inverseJoinColumns = @JoinColumn(name = "region_id")
  )
  Set<Region> availableRegions = new HashSet<>();
}
