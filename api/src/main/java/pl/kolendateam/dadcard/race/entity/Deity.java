package pl.kolendateam.dadcard.race.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.items.enchantment.entity.EnchantedItems;
import pl.kolendateam.dadcard.spells.entity.Domains;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Deity implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  String name;

  @ManyToMany
  @JoinTable(
    name = "deity_domain",
    joinColumns = @JoinColumn(name = "deity_id"),
    inverseJoinColumns = @JoinColumn(name = "domains_id")
  )
  Set<Domains> domains = new HashSet<>();

  @ManyToOne
  @JoinColumn(name = "alignment_id")
  Alignment alignment;

  @ManyToMany
  @JoinTable(
    name = "worshiper_alignments",
    joinColumns = @JoinColumn(name = "deity_id"),
    inverseJoinColumns = @JoinColumn(name = "alignment_id")
  )
  Set<Alignment> worshiperAlignments = new HashSet<>();

  @ManyToMany
  @JoinTable(
    name = "favored_weapons",
    joinColumns = @JoinColumn(name = "deity_id"),
    inverseJoinColumns = @JoinColumn(name = "enchanted_items_id")
  )
  Set<EnchantedItems> favoredWeapons = new HashSet<>();

  String avatarUrl;

  public Deity(int idDeity) {
    this.id = idDeity;
  }
}
