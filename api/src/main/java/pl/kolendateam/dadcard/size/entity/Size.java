package pl.kolendateam.dadcard.size.entity;

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
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.armorClass.entity.ArmorClass;
import pl.kolendateam.dadcard.attack.entity.SpecialAttacks;
import pl.kolendateam.dadcard.skills.entity.ClassSkills;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Size implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  byte id;

  @Enumerated(EnumType.STRING)
  SizeEnum size;

  @JdbcTypeCode(SqlTypes.JSON)
  SpecialAttacks specialAttacks;

  @JdbcTypeCode(SqlTypes.JSON)
  ClassSkills skill;

  @JdbcTypeCode(SqlTypes.JSON)
  ArmorClass armorBonus;

  int bab;
  // public void sizeBonus(SizeEnum sizeEnum) {
  //   this.size = sizeEnum;

  //   int bonusSize = 0;
  //   int hideSize = 0;
  //   int grappleSize = 0;
  //   switch (size) {
  //     case TINY:
  //       bonusSize = 2;
  //       hideSize = 8;
  //       grappleSize = -8;
  //       break;
  //     case SMALL:
  //       bonusSize = 1;
  //       hideSize = 4;
  //       grappleSize = -4;
  //       break;
  //     case MEDIUM:
  //       bonusSize = 0;
  //       hideSize = 0;
  //       grappleSize = 0;
  //       break;
  //     case LARGE:
  //       bonusSize = -1;
  //       hideSize = -4;
  //       grappleSize = 4;
  //       break;
  //   }
  //   this.bonus = bonusSize;
  //   this.hide = hideSize;
  //   this.grapple = grappleSize;
  // }
}
