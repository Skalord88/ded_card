package pl.kolendateam.dadcard.attack.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Entity
public class SpecialAttacks implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  String name;
  int bonus;
  String[] target;
  //   int bullRush;
  //   int charge;
  //   int disarm;
  //   int grapple;
  //   int overrun;
  //   int sunder;

  //   public SpecialAttacks addSpecialAttackFeat(
  //     SpecialAttacks spAtt,
  //     SpecialAttacks characterSpecialAttacks
  //   ) {
  //     characterSpecialAttacks.bullRush += spAtt.bullRush;
  //     characterSpecialAttacks.charge += spAtt.charge;
  //     characterSpecialAttacks.disarm += spAtt.disarm;
  //     characterSpecialAttacks.grapple += spAtt.grapple;
  //     characterSpecialAttacks.overrun += spAtt.overrun;
  //     characterSpecialAttacks.sunder += spAtt.sunder;

  //     return characterSpecialAttacks;
  //   }
}
