package pl.kolendateam.dadcard.items.weapons.entity;
import java.io.Serializable;
import java.math.BigDecimal;

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

}