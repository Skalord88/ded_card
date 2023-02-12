package ded_card;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Pg {

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer pgId;

    String pgracesName;
    String pgsubRacesName;
    int pgStrenght;
    int pgBaseAttackBonus;
    

    public Pg() {
    }
    
    public Pg(String pgracesName, String pgsubRacesName, int pgStrenght, int pgBaseAttackBonus) {
        this.pgracesName = pgracesName;
        this.pgsubRacesName = pgsubRacesName;
        this.pgStrenght = pgStrenght;
        this.pgBaseAttackBonus = pgBaseAttackBonus;
    }
    public String getPgracesName() {
        return pgracesName;
    }
    public void setPgracesName(String pgracesName) {
        this.pgracesName = pgracesName;
    }
    public String getPgsubRacesName() {
        return pgsubRacesName;
    }
    public void setPgsubRacesName(String pgsubRacesName) {
        this.pgsubRacesName = pgsubRacesName;
    }
    public int getPgStrenght() {
        return pgStrenght;
    }
    public void setPgStrenght(int pgStrenght) {
        this.pgStrenght = pgStrenght;
    }
    public int getPgBaseAttackBonus() {
        return pgBaseAttackBonus;
    }
    public void setPgBaseAttackBonus(int pgBaseAttackBonus) {
        this.pgBaseAttackBonus = pgBaseAttackBonus;
    }

}
