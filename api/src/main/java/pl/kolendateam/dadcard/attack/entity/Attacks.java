package pl.kolendateam.dadcard.attack.entity;

import java.io.Serializable;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.attack.dto.AttacksDTO;
import pl.kolendateam.dadcard.items.MapperItems;
import pl.kolendateam.dadcard.items.weapons.entity.Weapons;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Attacks implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "attacks_id_onefirst", referencedColumnName = "id")
    Weapons firstAttackSetOne;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "attacks_id_onesecond", referencedColumnName = "id")
    Weapons secondAttackSetOne;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "attacks_id_oneadditional", referencedColumnName = "id")
    Weapons additionalAttackSetOne;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "attacks_id_twofirst", referencedColumnName = "id")
    Weapons firstAttackSetTwo;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "attacks_id_twosecond", referencedColumnName = "id")
    Weapons secondAttackSetTwo;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "attacks_id_twoadditional", referencedColumnName = "id")
    Weapons additionalAttackSetTwo;

    public void setCharactersAttacks(AttacksDTO characterAttacksDTO) {

        this.firstAttackSetOne = MapperItems.toWeapon(characterAttacksDTO.firstAttackSetOne);
        this.secondAttackSetOne = MapperItems.toWeapon(characterAttacksDTO.secondAttackSetOne);
        this.additionalAttackSetOne = MapperItems.toWeapon(characterAttacksDTO.additionalAttackSetOne);
        this.firstAttackSetTwo = MapperItems.toWeapon(characterAttacksDTO.firstAttackSetTwo);
        this.secondAttackSetTwo = MapperItems.toWeapon(characterAttacksDTO.secondAttackSetTwo);
        this.additionalAttackSetTwo = MapperItems.toWeapon(characterAttacksDTO.secondAttackSetTwo);

    }

}
