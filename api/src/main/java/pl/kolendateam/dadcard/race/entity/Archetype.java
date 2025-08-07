package pl.kolendateam.dadcard.race.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.feats.entity.Prerequisite;

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

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(
    name = "modifiers_id",
    referencedColumnName = "id",
    nullable = true
  )
  Prerequisite modifiers;

  // @ManyToMany
  // @JoinTable(
  //   name = "archetype_feats",
  //   joinColumns = @JoinColumn(name = "archetype_id"),
  //   inverseJoinColumns = @JoinColumn(name = "feats_id")
  // )
  // Set<Feats> archetypeFeats = new HashSet<>();

  // @ManyToMany
  // @JoinTable(
  //   name = "archetype_special_abilities",
  //   joinColumns = @JoinColumn(name = "archetype_id"),
  //   inverseJoinColumns = @JoinColumn(name = "special_abilities_id")
  // )
  // Set<SpecialAbilities> specialAbilities = new HashSet<>();

  byte levelAdjustment;

  String avatarUrl;
}
