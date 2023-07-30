package pl.kolendateam.dadcard.weapons.entity;
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

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Weapons {

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
    double weight;

    @NonNull
    String type;

    double cost;
    String specialAttacks;
    String description;
    
}