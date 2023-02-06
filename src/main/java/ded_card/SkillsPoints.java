package ded_card;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class SkillsPoints {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private int points;
        
    public SkillsPoints() {
    }

    public SkillsPoints(int points) {
        this.points = points;
    }
    public int getPoints() {
        return points;
    }
    public void setPoints(int points) {
        this.points = points;
    }

}
