package pl.kolendateam.dadcard.size.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import java.io.Serializable;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.attack.entity.SpecialAttacks;

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

  @ManyToMany(cascade = CascadeType.MERGE)
  @JoinTable(
    name = "size_attack",
    joinColumns = @JoinColumn(name = "size_id"),
    inverseJoinColumns = @JoinColumn(name = "special_attacks_id")
  )
  List<SpecialAttacks> specialAttacks;

  int bonus;
  int hide;
  int grapple;
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
