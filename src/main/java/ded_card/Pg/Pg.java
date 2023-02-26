package ded_card.Pg;

import ded_card.Races.RacesName;
import ded_card.Races.SubRacesName;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Pg {
    
    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer pgId;

    private String pgName;
    // @Enumerated (EnumType.STRING)
    // private RacesName RacesName;
    // @Enumerated (EnumType.STRING)
    // private SubRacesName SubRacesName;
    // private int pgStrenght;
    // private int pgModStrenght;
    // private int pgDextrity;
    // private int pgModDextrity;
    // private int pgConsitution;
    // private int pgModConsitution;
    // private int pgIntelligence;
    // private int pgModIntelligence;
    // private int pgWisdom;
    // private int pgModWisdom;
    // private int pgCharisma;
    // private int pgModCharisma;
    // private double pgBaseAttackBonus;
    // private double pgFortitude;
    // private double pgReflex;
    // private double pgWill;
    // private int pgSkillPoints;
    // private boolean appraise;
    // private boolean balance;
    // private boolean bluff;
    // private boolean climb;
    // private boolean concentration;
    // private boolean craft;
    // private boolean diplomacy;
    // private boolean disable_device;
    // private boolean disguise;
    // private boolean escape_artist;
    // private boolean gather_information;
    // private boolean handle_animal;
    // private boolean heal;
    // private boolean intimidate;
    // private boolean jump;
    // private boolean knowledge;
    // private boolean listen;
    // private boolean move_silently;
    // private boolean perform;
    // private boolean profession;
    // private boolean ride;
    // private boolean search;
    // private boolean sense_motive;
    // private boolean sleight_of_hand;
    // private boolean spellcraft;
    // private boolean spot;
    // private boolean survival;
    // private boolean swim;
    // private boolean tumble;
    // private boolean use_magic_device;
    // private boolean use_rope;

}
