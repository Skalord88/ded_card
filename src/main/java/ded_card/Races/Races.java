package ded_card.Races;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Races {

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer racesId;

    @Enumerated (EnumType.STRING)
    private RacesName racesName;
    @Enumerated (EnumType.STRING)
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
