package pl.kolendateam.dadcard.items.armor.dto;

import java.io.Serializable;
import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.items.armor.entity.Armors;
import pl.kolendateam.dadcard.items.armor.entity.ArmorsEnum;
import pl.kolendateam.dadcard.items.entity.ItemTypeEnum;
import pl.kolendateam.dadcard.items.entity.MaterialEnum;

@AllArgsConstructor
@NoArgsConstructor
public class ArmorsDTO implements Serializable {

  public int id;
  public String name;
  public ItemTypeEnum itemType;
  public ArmorsEnum armorName;
  public int armorClass;
  public BigDecimal cost;
  public BigDecimal weight;
  public ArmorsEnum armorType;
  public int maxDex;
  public int penality;
  public int failure;
  public String description;
  public MaterialEnum material;

  public ArmorsDTO(int idZero) {
    this.id = idZero;
  }

  public ArmorsDTO(Armors item) {
    this.id = item.getId();
    this.name = item.getName();
    this.itemType = ItemTypeEnum.ARMOR;
    this.armorName = item.getArmorName();
    this.armorClass = item.getArmorClass();
    this.cost = item.getCost();
    this.weight = item.getWeight();
    this.armorType = item.getArmorType();
    this.maxDex = item.getMaxDex();
    this.penality = item.getPenality();
    this.failure = item.getFailure();
    this.description = item.getDescription();
    this.material = item.getMaterial();
  }

}
