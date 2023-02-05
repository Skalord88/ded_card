package ded_card;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class BaseAttackBonus {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String bonus;
    private double number;
    private double addLevel;

    public String getBonus() {
        return bonus;
    }

    public void setBonus(String bonus) {
        this.bonus = bonus;
    }

    public double getNumber() {
        return number;
    }

    public void setNumber(double number) {
        this.number = number;
    }

    public double getAddLevel() {
        return addLevel;
    }

    public void setAddLevel(double addLevel) {
        this.addLevel = addLevel;
    }

    public BaseAttackBonus() {
    }

    public BaseAttackBonus(String bonus, double number, double addLevel) {
        this.bonus = bonus;
        this.number = number;
        this.addLevel = addLevel;
    }
    

}
