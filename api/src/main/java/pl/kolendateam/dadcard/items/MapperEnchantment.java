package pl.kolendateam.dadcard.items;

import pl.kolendateam.dadcard.items.dto.EnchantmentDTO;
import pl.kolendateam.dadcard.items.entity.Enchantment;

public class MapperEnchantment {

    public static EnchantmentDTO toEnchantmentDTO(Enchantment enchantment) {

        return new EnchantmentDTO(
                enchantment);
    }

    public static Enchantment toEnchantment(int id) {
        return new Enchantment(id);
    }

}
