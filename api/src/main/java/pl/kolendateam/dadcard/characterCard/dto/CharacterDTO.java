package pl.kolendateam.dadcard.characterCard.dto;

import org.apache.commons.lang3.ObjectUtils.Null;

import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPg;

@NoArgsConstructor
public class CharacterDTO {
    public String characterName;
    public String playerName;
    public ClassPg classPg;

    public CharacterDTO(Character character){
        this.characterName = character.getCharacterName();
        this.playerName = character.getPlayerName();
        this.classPg = character.getClassPg();
    }
}