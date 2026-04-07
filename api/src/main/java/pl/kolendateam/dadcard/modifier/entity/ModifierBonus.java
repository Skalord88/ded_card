package pl.kolendateam.dadcard.modifier.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.modifier.dto.ModifierDTO;

// @Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ModifierBonus implements Serializable {

  // @Id
  // @GeneratedValue(strategy = GenerationType.IDENTITY)
  // int id;

  @Enumerated(EnumType.STRING)
  ModifierEnum modifier;

  Integer bonus;

  @Enumerated(EnumType.STRING)
  ModifierEnum[] targets;

  public ModifierBonus(ModifierDTO mod) {
    this.modifier = mod.modifier;
    this.bonus = mod.bonus;
    this.targets = mod.targets;
  }
}
