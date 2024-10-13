package pl.kolendateam.dadcard.items.enchantment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.kolendateam.dadcard.items.enchantment.entity.EnchantedItems;

public interface EnchantedItemsRepository
  extends JpaRepository<EnchantedItems, Integer> {}
