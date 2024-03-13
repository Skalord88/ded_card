package pl.kolendateam.dadcard.items.armor.dto;

import java.math.BigDecimal;
import pl.kolendateam.dadcard.items.armor.entity.ArmorsEnum;
import pl.kolendateam.dadcard.items.armor.entity.Shilds;
import pl.kolendateam.dadcard.items.entity.ItemTypeEnum;

public class ShildsDTO {

  public int id;
  public String name;
  public ItemTypeEnum itemType;
  public ArmorsEnum shieldName;
  public int armorClass;
  public BigDecimal cost;
  public BigDecimal weight;
  public ArmorsEnum armorType;
  public int maxDex;
  public int penality;
  public int failure;
  public String description;

  public ShildsDTO(Shilds item) {
    this.id = item.getId();
    this.name = item.getName();
    this.itemType = ItemTypeEnum.ARMOR;
    this.shieldName = item.getShieldName();
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
