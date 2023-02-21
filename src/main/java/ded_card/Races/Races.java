package ded_card.Races;

import java.util.Map;

import org.postgresql.util.HStoreConverter;

import jakarta.persistence.Convert;
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
public class Races {

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer racesId;

    @Enumerated (EnumType.STRING)
    private RacesName racesName;
    @Enumerated (EnumType.STRING)
    private SubRacesName subRacesName;
    private String raceAbilitiesJSON;
    @Convert(converter = HStoreConverter.class)
    private Map <String, Integer> raceAbilities;
    private Map <String, Integer> raceSkills;

}
