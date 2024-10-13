package pl.kolendateam.dadcard.items.enchantment;

import java.util.HashSet;
import java.util.Set;
import pl.kolendateam.dadcard.items.enchantment.dto.EnchantmentDTO;
import pl.kolendateam.dadcard.items.enchantment.entity.Enchantment;

public class MapperEnchantment {

  public static EnchantmentDTO toEnchantmentDTO(Enchantment enchantment) {
    return new EnchantmentDTO(enchantment);
  }

  public static Enchantment toEnchantment(EnchantmentDTO enchantmentDTO) {
    return new Enchantment(enchantmentDTO);
  }

  public static Set<EnchantmentDTO> toEnchantmentDTOSet(Set<Enchantment> list) {
    Set<EnchantmentDTO> listDTO = new HashSet<>();
    list.forEach(ench -> {
      EnchantmentDTO enchDTO = new EnchantmentDTO(ench);
      listDTO.add(enchDTO);
    });
    return listDTO;
  }
}
