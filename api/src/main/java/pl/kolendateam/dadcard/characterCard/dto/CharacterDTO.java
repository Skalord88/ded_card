package pl.kolendateam.dadcard.characterCard.dto;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.characterCard.entity.Abilitys;
import pl.kolendateam.dadcard.characterCard.entity.Character;

@NoArgsConstructor
public class CharacterDTO {
    public String characterName;
    public String playerName;
    public Abilitys ability;

    public CharacterDTO(Character character){
        this.characterName = character.getCharacterName();
        this.playerName = character.getPlayerName();
        this.ability = character.getAbilitys();
    }
}
