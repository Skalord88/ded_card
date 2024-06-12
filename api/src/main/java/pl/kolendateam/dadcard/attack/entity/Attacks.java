package pl.kolendateam.dadcard.attack.entity;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import pl.kolendateam.dadcard.attack.dto.AttacksDTO;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.weapons.entity.Weapons;

@Getter
@Setter
@Entity
@AllArgsConstructor
@EqualsAndHashCode
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

    public Attacks() {
        Weapons weapon = new Weapons(1);
        this.firstAttackSetOne = weapon;
        this.secondAttackSetOne = weapon;
        this.additionalAttackSetOne = weapon;
        this.firstAttackSetTwo = weapon;
        this.secondAttackSetTwo = weapon;
        this.additionalAttackSetTwo = weapon;
    }

    public void setCharactersAttacks(AttacksDTO characterAttacksDTO, List<Items> itemsList) {

        if (characterAttacksDTO.firstAttackSetOne != null) {
            for (Items item : itemsList) {
                if (item.getId() == characterAttacksDTO.firstAttackSetOne.id) {
                    this.firstAttackSetOne = (Weapons) item;
                    break;
                }
            }
        }
        if (characterAttacksDTO.secondAttackSetOne != null) {
            for (Items item : itemsList) {
                if (item.getId() == characterAttacksDTO.secondAttackSetOne.id) {
                    this.secondAttackSetOne = (Weapons) item;
                    break;
                }
            }
        }
        if (characterAttacksDTO.additionalAttackSetOne != null) {
            for (Items item : itemsList) {
                if (item.getId() == characterAttacksDTO.additionalAttackSetOne.id) {
                    this.additionalAttackSetOne = (Weapons) item;
                    break;
                }
            }
        }
        if (characterAttacksDTO.firstAttackSetTwo != null) {
            for (Items item : itemsList) {
                if (item.getId() == characterAttacksDTO.firstAttackSetTwo.id) {
                    this.firstAttackSetTwo = (Weapons) item;
                    break;
                }
            }
        }
        if (characterAttacksDTO.secondAttackSetTwo != null) {
            for (Items item : itemsList) {
                if (item.getId() == characterAttacksDTO.secondAttackSetTwo.id) {
                    this.secondAttackSetTwo = (Weapons) item;
                    break;
                }
            }
        }
        if (characterAttacksDTO.additionalAttackSetTwo != null) {
            for (Items item : itemsList) {
                if (item.getId() == characterAttacksDTO.additionalAttackSetTwo.id) {
                    this.additionalAttackSetTwo = (Weapons) item;
                    break;
                }
            }
        }
    }

}
