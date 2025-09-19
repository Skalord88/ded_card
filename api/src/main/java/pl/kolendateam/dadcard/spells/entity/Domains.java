package pl.kolendateam.dadcard.spells.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.modifier.entity.ModifierBonus;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Domains implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  @Enumerated(EnumType.STRING)
  SpellsEnum domain;

  String grantedPower;

  // @ManyToMany
  // @JoinTable(
  //   name = "domain_spells",
  //   joinColumns = @JoinColumn(name = "domains_id"),
  //   inverseJoinColumns = @JoinColumn(name = "domain_spell_id")
  // )
  // Set<DomainSpell> domainSpells;
  @JdbcTypeCode(SqlTypes.JSON)
  Map<Integer, Integer> domainSpells;

  @JdbcTypeCode(SqlTypes.JSON)
  Set<ModifierBonus> modifiers;
}
