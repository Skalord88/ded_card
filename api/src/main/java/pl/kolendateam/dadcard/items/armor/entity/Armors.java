package pl.kolendateam.dadcard.items.armor.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.items.entity.Items;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@DiscriminatorValue(value = "ARMOR")
public class Armors extends Items {

  @Enumerated(EnumType.STRING)
  ArmorsEnum armorName;

  int armorClass;

  @Enumerated(EnumType.STRING)
  ArmorsEnum armorType;

  int maxDex;
  int penality;
  int failure;
}
