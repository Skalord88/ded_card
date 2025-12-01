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
import jakarta.persistence.OneToOne;
import java.io.Serializable;
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
public class RacialRegion implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  short id;

  String racialRegion;

  @OneToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
  @JoinColumn(name = "region_id", referencedColumnName = "id")
  Region region;

  @ManyToMany
  @JoinTable(
    name = "regional_sub_races",
    joinColumns = @JoinColumn(name = "racial_region_id"),
    inverseJoinColumns = @JoinColumn(name = "sub_race_id")
  )
  Set<SubRace> regionalSubRaces;

  @JdbcTypeCode(SqlTypes.JSON)
  LanguageEnum[] automaticLanguages;

  @JdbcTypeCode(SqlTypes.JSON)
  LanguageEnum[] bonusLanguages;

  @ManyToMany
  @JoinTable(
    name = "regional_deitys",
    joinColumns = @JoinColumn(name = "racial_region_id"),
    inverseJoinColumns = @JoinColumn(name = "deity_id")
  )
  Set<Deity> preferedDeities;

  @ManyToMany
  @JoinTable(
    name = "regional_feats",
    joinColumns = @JoinColumn(name = "racial_region_id"),
    inverseJoinColumns = @JoinColumn(name = "feat_id")
  )
  Set<Feat> regionalFeats;

  @ManyToMany
  @JoinTable(
    name = "regional_items",
    joinColumns = @JoinColumn(name = "racial_region_id"),
    inverseJoinColumns = @JoinColumn(name = "enchanted_items_id")
  )
  Set<EnchantedItems> regionalItems;
}
