package pl.kolendateam.dadcard.race.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import java.util.List;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.feats.entity.Feat;
import pl.kolendateam.dadcard.items.enchantment.entity.EnchantedItems;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Region {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  short id;

  String name;

  @ManyToMany
  @JoinTable(
    name = "regional_sub_races",
    joinColumns = @JoinColumn(name = "region_id"),
    inverseJoinColumns = @JoinColumn(name = "sub_race_id")
  )
  Set<SubRace> regionalSubRaces;

  @ManyToMany
  @JoinTable(
    name = "regional_alignments",
    joinColumns = @JoinColumn(name = "region_id"),
    inverseJoinColumns = @JoinColumn(name = "alignment_id")
  )
  Set<Alignment> regionalAlignment;

  @JdbcTypeCode(SqlTypes.JSON)
  LanguageEnum[] bonusLanguages;

  @ManyToMany
  @JoinTable(
    name = "regional_deitys",
    joinColumns = @JoinColumn(name = "region_id"),
    inverseJoinColumns = @JoinColumn(name = "deity_id")
  )
  Set<Deity> preferedDeities;

  @ManyToMany
  @JoinTable(
    name = "regional_feats",
    joinColumns = @JoinColumn(name = "region_id"),
    inverseJoinColumns = @JoinColumn(name = "feats_id")
  )
  Set<Feat> regionalFeats;

  @ManyToMany
  @JoinTable(
    name = "regional_items",
    joinColumns = @JoinColumn(name = "region_id"),
    inverseJoinColumns = @JoinColumn(name = "enchanted_items_id")
  )
  Set<EnchantedItems> regionalItems;

  String description;
}
