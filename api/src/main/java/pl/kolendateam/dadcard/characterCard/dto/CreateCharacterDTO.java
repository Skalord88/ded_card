package pl.kolendateam.dadcard.characterCard.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.characterCard.entity.Character;

@AllArgsConstructor
@NoArgsConstructor
public class CreateCharacterDTO {
    public int characterId;
    public String characterName;
    public String playerName;

    public CreateCharacterDTO(Character character) {
        this.characterId = character.getId();
        this.characterName = character.getCharacterName();
        this.playerName = character.getPlayerName();
    }
}
