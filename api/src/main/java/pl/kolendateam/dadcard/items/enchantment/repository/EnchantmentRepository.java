package pl.kolendateam.dadcard.items.enchantment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.kolendateam.dadcard.items.enchantment.entity.Enchantment;

public interface EnchantmentRepository
  extends JpaRepository<Enchantment, Integer> {}
