package pl.kolendateam.dadcard.attack.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.io.Serializable;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.attack.dto.AttacksDTO;
import pl.kolendateam.dadcard.items.enchantment.entity.EnchantedItems;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Attacks implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "attacks_id_onefirst", referencedColumnName = "id")
  EnchantedItems firstAttackSetOne;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "attacks_id_onesecond", referencedColumnName = "id")
  EnchantedItems secondAttackSetOne;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "attacks_id_oneadditional", referencedColumnName = "id")
  EnchantedItems additionalAttackSetOne;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "attacks_id_twofirst", referencedColumnName = "id")
  EnchantedItems firstAttackSetTwo;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "attacks_id_twosecond", referencedColumnName = "id")
  EnchantedItems secondAttackSetTwo;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "attacks_id_twoadditional", referencedColumnName = "id")
  EnchantedItems additionalAttackSetTwo;

  public void setCharactersAttacks(
    AttacksDTO characterAttacksDTO,
    List<EnchantedItems> items
  ) {
    /// firstAttackSetOne
    int indexWeapon = findIndexItem(
      characterAttacksDTO.firstAttackSetOne.id,
      items
    );
    if (firstAttackSetOne == null) {
      firstAttackSetOne = indexWeapon != -1 ? items.get(indexWeapon) : null;
    } else {
      this.firstAttackSetOne =
        firstAttackSetOne.getId() == characterAttacksDTO.firstAttackSetOne.id
          ? firstAttackSetOne
          : indexWeapon != -1 ? items.get(indexWeapon) : null;
    }
    /// secondAttackSetOne
    indexWeapon =
      findIndexItem(characterAttacksDTO.secondAttackSetOne.id, items);
    if (secondAttackSetOne == null) {
      secondAttackSetOne = indexWeapon != -1 ? items.get(indexWeapon) : null;
    } else {
      this.secondAttackSetOne =
        secondAttackSetOne.getId() == characterAttacksDTO.secondAttackSetOne.id
          ? secondAttackSetOne
          : indexWeapon != -1 ? items.get(indexWeapon) : null;
    }
    /// additionalAttackSetOne
    indexWeapon =
      findIndexItem(characterAttacksDTO.additionalAttackSetOne.id, items);
    if (additionalAttackSetOne == null) {
      additionalAttackSetOne =
        indexWeapon != -1 ? items.get(indexWeapon) : null;
    } else {
      this.additionalAttackSetOne =
        additionalAttackSetOne.getId() ==
          characterAttacksDTO.additionalAttackSetOne.id
          ? additionalAttackSetOne
          : indexWeapon != -1 ? items.get(indexWeapon) : null;
    }
    /// firstAttackSetTwo
    indexWeapon =
      findIndexItem(characterAttacksDTO.firstAttackSetTwo.id, items);
    if (firstAttackSetTwo == null) {
      firstAttackSetTwo = indexWeapon != -1 ? items.get(indexWeapon) : null;
    } else {
      this.firstAttackSetTwo =
        firstAttackSetTwo.getId() == characterAttacksDTO.firstAttackSetTwo.id
          ? firstAttackSetTwo
          : indexWeapon != -1 ? items.get(indexWeapon) : null;
    }
    /// secondAttackSetTwo
    indexWeapon =
      findIndexItem(characterAttacksDTO.secondAttackSetTwo.id, items);
    if (secondAttackSetTwo == null) {
      secondAttackSetTwo = indexWeapon != -1 ? items.get(indexWeapon) : null;
    } else {
      this.secondAttackSetTwo =
        secondAttackSetTwo.getId() == characterAttacksDTO.secondAttackSetTwo.id
          ? secondAttackSetTwo
          : indexWeapon != -1 ? items.get(indexWeapon) : null;
    }
    /// additionalAttackSetTwo
    indexWeapon =
      findIndexItem(characterAttacksDTO.additionalAttackSetTwo.id, items);
    if (additionalAttackSetTwo == null) {
      additionalAttackSetTwo =
        indexWeapon != -1 ? items.get(indexWeapon) : null;
    } else {
      this.additionalAttackSetTwo =
        additionalAttackSetTwo.getId() ==
          characterAttacksDTO.additionalAttackSetTwo.id
          ? additionalAttackSetTwo
          : indexWeapon != -1 ? items.get(indexWeapon) : null;
    }
  }

  public int findIndexItem(int id, List<EnchantedItems> items) {
    for (int i = 0; i < items.size(); i++) {
      if (items.get(i).getId() == id) {
        return i;
      }
    }
    return -1;
  }
}
