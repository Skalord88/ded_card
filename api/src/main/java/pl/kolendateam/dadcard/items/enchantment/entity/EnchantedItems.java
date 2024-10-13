package pl.kolendateam.dadcard.items.enchantment.entity;

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
import jakarta.persistence.ManyToOne;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.entity.MaterialEnum;
import pl.kolendateam.dadcard.modifier.dto.ModifierDTO;
import pl.kolendateam.dadcard.modifier.entity.ModifierBonus;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class EnchantedItems implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "items_id", referencedColumnName = "id")
  Items item;

  @ManyToMany
  @JoinTable(
    name = "enchanted_list",
    joinColumns = @JoinColumn(name = "enchanted_items_id"),
    inverseJoinColumns = @JoinColumn(name = "enchantment_id")
  )
  Set<Enchantment> enchantmentList = new HashSet<>();

  @Enumerated(EnumType.STRING)
  MaterialEnum material;

  @JdbcTypeCode(SqlTypes.JSON)
  Set<ModifierBonus> modifiers;

  double cost;

  String description;
}
