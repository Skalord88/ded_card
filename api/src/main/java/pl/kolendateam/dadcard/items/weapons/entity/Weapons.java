package pl.kolendateam.dadcard.items.weapons.entity;
import java.util.ArrayList;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.items.entity.Items;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@DiscriminatorValue(value = "WEAPON")
public class Weapons extends Items {

    @Enumerated(EnumType.STRING)
    WeaponNameEnum weaponName;

    @NonNull
    @Enumerated(EnumType.STRING)
    WeaponNumericEnum damage;

    @NonNull
    @Enumerated(EnumType.STRING)
    WeaponNumericEnum critical;

    Integer range;

    @NonNull
    String type;

    String specialAttacks;

    public int findItemIndexinArrayById(ArrayList<Object> items,Weapons weapon) {

        for(int i = 0; i < items.size(); i++){
            if(weapon.equals(items.get(i))){
                return i;
            }
        }

        return 0;
    }

}