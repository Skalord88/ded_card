package pl.kolendateam.dadcard.items.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.kolendateam.dadcard.items.armor.entity.Armors;
import pl.kolendateam.dadcard.items.armor.entity.ArmorsEnum;
import pl.kolendateam.dadcard.items.armor.entity.Shields;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.entity.MaterialEnum;
import pl.kolendateam.dadcard.items.weapons.entity.Weapons;

@Repository
public interface ItemsRepository extends JpaRepository<Items, Integer> {
  // Optional<Armors> findArmorsByEnchantmentAndArmorTypeAndFailureAndPenalityAndMaterial(
  //   ArmorsEnum armorType,
  //   int failure,
  //   int penality,
  //   MaterialEnum material
  // );

  // Optional<Shields> findShieldsByEnchantmentAndArmorTypeAndFailureAndPenalityAndMaterial(
  //   ArmorsEnum armorType,
  //   int failure,
  //   int penality,
  //   MaterialEnum material
  // );

  // Optional<Weapons> findWeaponsByEnchantmentAndMaterial(MaterialEnum material);
}
