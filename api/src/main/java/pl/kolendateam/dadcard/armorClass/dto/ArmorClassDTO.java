package pl.kolendateam.dadcard.armorClass.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.armorClass.entity.ArmorClass;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;

@AllArgsConstructor
@NoArgsConstructor
public class ArmorClassDTO {

  public int sizeBonus;
  public int armorBonus;
  public int shieldBonus;
  public int enhancementBonuses;
  public int deflectionBonuses;
  public int naturalArmor;
  public int dodgeBonus;

  public ModifierEnum[] target;

  public String special;

  public ArmorClassDTO(ArmorClass aC) {
    this.sizeBonus = aC.getSizeBonus();
    this.armorBonus = aC.getArmorBonus();
    this.shieldBonus = aC.getShieldBonus();
    this.enhancementBonuses = aC.getEnhancementBonuses();
    this.deflectionBonuses = aC.getDeflectionBonuses();
    this.naturalArmor = aC.getNaturalArmor();
    this.dodgeBonus = aC.getDodgeBonus();
    this.target = aC.getTarget() != null ? aC.getTarget() : null;
    this.special = aC.getSpecial() != null ? aC.getSpecial() : null;
  }
}
