package ded_card;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class Pg {

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer pgId;

    String pgracesName;
    String pgsubRacesName;
    int pgStrenght;
    int pgBaseAttackBonus;

}
