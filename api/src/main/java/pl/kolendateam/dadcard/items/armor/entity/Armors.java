package pl.kolendateam.dadcard.items.armor.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.items.entity.ItemTypeEnum;
import pl.kolendateam.dadcard.items.entity.Items;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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

  public void setItemType(ItemTypeEnum itemType) {
  }

  public Armors(int idZero) {
    super(idZero);
  }

}
