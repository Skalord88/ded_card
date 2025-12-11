package pl.kolendateam.dadcard.race.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import java.io.Serializable;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Region implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  short id;

  String name;

  String linkRegion;

  @ManyToMany
  @JoinTable(
    name = "region_alignments",
    joinColumns = @JoinColumn(name = "region_id"),
    inverseJoinColumns = @JoinColumn(name = "alignment_id")
  )
  Set<Alignment> regionalAlignment;

  String description;
}
