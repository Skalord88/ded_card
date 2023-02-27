package ded_card.mod;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ModAbilities {

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer modAbilitiesId;
    private int abilities;
    private int modAbilities;
    private int bonusSpell1;
    private int bonusSpell2;
    private int bonusSpell3;
    private int bonusSpell4;
    private int bonusSpell5;
    private int bonusSpell6;
    private int bonusSpell7;
    private int bonusSpell8;
    private int bonusSpell9;
    
}
