package pl.kolendateam.items.weapons.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import pl.kolendateam.items.entity.Items;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Weapons extends Items {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @NonNull
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