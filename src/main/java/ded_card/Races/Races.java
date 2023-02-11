package ded_card.Races;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Races {

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer racesId;

    private RacesName racesName;
    private SubRacesName subRacesName;
    private int strenght;


    public RacesName getRacesName() {
        return racesName;
    }

    public void setRacesName(RacesName racesName) {
        this.racesName = racesName;
    }

    public SubRacesName getSubRacesName() {
        return subRacesName;
    }

    public void setSubRacesName(SubRacesName subRacesName) {
        this.subRacesName = subRacesName;
    }

    public int getStrenght() {
        return strenght;
    }

    public void setStrenght(int strenght) {
        this.strenght = strenght;
    }

    public Races() {
    }
}
