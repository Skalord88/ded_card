package pl.kolendateam.dadcard.items.entity;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.items.dto.EnchantmentDTO;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Enchantment implements Serializable {

    @Id
    int id;

    int enchantment;

    public Enchantment(EnchantmentDTO enchantmentDTO) {
        this.id = enchantmentDTO.id;
        this.enchantment = enchantmentDTO.enchantment;
    }

}
