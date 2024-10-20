package pl.kolendateam.dadcard.items.enchantment;

import java.util.HashSet;
import java.util.Set;
import pl.kolendateam.dadcard.items.enchantment.dto.EnchantmentDTO;
import pl.kolendateam.dadcard.items.enchantment.entity.Enchantment;

public class MapperEnchantment {

  public static EnchantmentDTO toEnchantmentDTO(Enchantment enchantment) {
    if (enchantment != null) return new EnchantmentDTO(enchantment);
    return new EnchantmentDTO();
  }

  public static Enchantment toEnchantment(EnchantmentDTO enchantmentDTO) {
    if (enchantmentDTO != null) return new Enchantment(enchantmentDTO);
    return new Enchantment();
  }

  public static Set<EnchantmentDTO> toEnchantmentDTOSet(Set<Enchantment> list) {
    Set<EnchantmentDTO> listDTO = new HashSet<>();
    if (list != null) list.forEach(ench -> {
      if (ench != null) {
        EnchantmentDTO enchDTO = new EnchantmentDTO(ench);
        listDTO.add(enchDTO);
      }
    });
    return listDTO;
  }
}
