package pl.kolendateam.dadcard.items.entity;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Enchantment implements Serializable {

    @Id
    int id;

    int enchantment;

    public Enchantment(int id) {
        this.id = id;
    }

}
