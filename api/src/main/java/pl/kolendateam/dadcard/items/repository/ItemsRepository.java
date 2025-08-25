package pl.kolendateam.dadcard.items.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.kolendateam.dadcard.items.entity.Item;

@Repository
public interface ItemsRepository extends JpaRepository<Item, Integer> {
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
