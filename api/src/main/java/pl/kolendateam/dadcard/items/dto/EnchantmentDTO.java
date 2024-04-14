package pl.kolendateam.dadcard.items.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.items.entity.Enchantment;

@AllArgsConstructor
@NoArgsConstructor
public class EnchantmentDTO implements Serializable {

    public int id;
    public int enchantment;

    public EnchantmentDTO(Enchantment enchantment) {
        this.id = enchantment.getId();
        this.enchantment = enchantment.getEnchantment();
    }

}
