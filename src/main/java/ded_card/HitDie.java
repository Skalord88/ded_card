package ded_card;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class HitDie {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String dice;
    private int number;
    
    public HitDie() {
    }

    public HitDie(String dice, int number) {
        this.dice = dice;
        this.number = number;
    }
    public String getDice() {
        return dice;
    }
    public void setDice(String dice) {
        this.dice = dice;
    }
    public int getNumber() {
        return number;
    }
    public void setNumber(int number) {
        this.number = number;
    }

}
