package pl.kolendateam.dadcard.armorClass.entity;

import java.io.Serializable;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.armorClass.dto.ArmorClassDTO;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;

@Getter
@Setter
@NoArgsConstructor
public class ArmorClass implements Serializable {

  // @ManyToMany(fetch = FetchType.LAZY)
  // @JoinTable(
  //   name = "armor_modifier_bonus",
  //   joinColumns = @JoinColumn(name = "character_card_id"),
  //   inverseJoinColumns = @JoinColumn(name = "archetype_id")
  // )
  // ModifierBonus modifierBonus;

  int bonus;

  @Enumerated(EnumType.STRING)
  ModifierEnum modifierBonus;

  // int sizeBonus;
  // int armorBonus;
  // int shieldBonus;
  // int enhancementBonuses;
  // int deflectionBonuses;
  // int naturalArmor;
  // int dodgeBonus;

  @JdbcTypeCode(SqlTypes.JSON)
  ModifierEnum[] target;

  String special;

  // public boolean checkPrerequisiteAC(ArmorClass aC) {
  //   return aC.armorBonus > 0;
  // }

  public ArmorClass(ArmorClassDTO armorClass) {
    // this.sizeBonus = armorClass.sizeBonus;
    // this.armorBonus = armorClass.armorBonus;
    // this.shieldBonus = armorClass.shieldBonus;
    // this.enhancementBonuses = armorClass.enhancementBonuses;
    // this.deflectionBonuses = armorClass.deflectionBonuses;
    // this.naturalArmor = armorClass.naturalArmor;
    // this.dodgeBonus = armorClass.dodgeBonus;
    this.bonus = armorClass.bonus;
    this.modifierBonus = armorClass.modifierBonus;
    this.target = armorClass.target;
    this.special = armorClass.special;
  }
}
