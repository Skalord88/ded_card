package pl.kolendateam.dadcard.items.armor.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.items.armor.dto.ShieldsDTO;
import pl.kolendateam.dadcard.items.entity.ItemTypeEnum;
import pl.kolendateam.dadcard.items.entity.Items;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@DiscriminatorValue(value = "SHIELD")
public class Shields extends Items {

  @Enumerated(EnumType.STRING)
  ArmorsEnum shieldName;

  int armorClass;

  @Enumerated(EnumType.STRING)
  ArmorsEnum armorType;

  int maxDex;
  int penality;
  int failure;

  public Shields(ShieldsDTO shield) {
    super(
        (short) shield.id,
        shield.name,
        shield.cost,
        shield.weight,
        shield.description);
    this.shieldName = shield.shieldName;
    this.armorClass = shield.armorClass;
    this.armorType = shield.armorType;
    this.maxDex = shield.maxDex;
    this.penality = shield.penality;
    this.failure = shield.failure;
  }

  public void setItemType(ItemTypeEnum itemType) {
  }

  public Shields(int idZero) {
    super(idZero);
  }
}
