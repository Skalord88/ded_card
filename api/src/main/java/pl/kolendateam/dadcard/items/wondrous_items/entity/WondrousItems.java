package pl.kolendateam.dadcard.items.wondrous_items.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.weapons.entity.WeaponNameEnum;

@Entity
@NoArgsConstructor
@DiscriminatorValue(value = "WONDROUS_ITEM")
public class WondrousItems extends Items {

  @Enumerated(EnumType.STRING)
  WeaponNameEnum weaponName;
}
