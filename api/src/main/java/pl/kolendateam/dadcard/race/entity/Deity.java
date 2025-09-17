package pl.kolendateam.dadcard.race.entity;

import jakarta.persistence.Entity;
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
public class Deity {

  int id;
  String name;
  Domains[] domains;
  Alignment alignment;
  Alignment[] worshiperAlignments;
  EnchantedItems favoredWeapon;
}
