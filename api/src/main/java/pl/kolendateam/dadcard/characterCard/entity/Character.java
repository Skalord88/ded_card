package pl.kolendateam.dadcard.characterCard.entity;

import org.json.JSONArray;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.characterCard.dto.AbilityDTO;
import pl.kolendateam.dadcard.characterCard.dto.AbilityMapperDTO;

@NoArgsConstructor
@Getter
@Setter
@Entity
@RequiredArgsConstructor
public class Character {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;

    @NonNull
    String characterName;

    @NonNull
    String playerName;

    @NonNull
    private String raceName;

    @NonNull
    private String subRaceName;

    @NonNull
    @Type(type = "json")
    @Column(columnDefinition = "json")
    private Abilitys abilitys;

}
