package pl.kolendateam.dadcard.items.armor.dto;

import java.math.BigDecimal;
import pl.kolendateam.dadcard.items.armor.entity.Armors;
import pl.kolendateam.dadcard.items.armor.entity.ArmorsEnum;

public class ArmorsDTO {

  public int id;
  public ArmorsEnum armorName;
  public int armorClass;
  public BigDecimal cost;
  public BigDecimal weight;
  public ArmorsEnum armorType;
  public int maxDex;
  public int penality;
  public int failure;
  public String description;

  public ArmorsDTO(Armors item) {
    this.id = item.getId();
    this.armorName = item.getArmorName();
    this.armorClass = item.getArmorClass();
    this.cost = item.getCost();
    this.weight = item.getWeight();
    this.armorType = item.getArmorType();
    this.maxDex = item.getMaxDex();
    this.penality = item.getPenality();
    this.failure = item.getFailure();
    this.description = item.getDescription();
  }
}
