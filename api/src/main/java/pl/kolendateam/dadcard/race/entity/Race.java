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
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.feats.entity.Feats;
import pl.kolendateam.dadcard.feats.entity.Prerequisite;

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

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(
    name = "modifiers_id",
    referencedColumnName = "id",
    nullable = true
  )
  Prerequisite modifiers;

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
