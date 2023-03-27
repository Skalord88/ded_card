package pl.kolendateam.dadcard.characterCard.dto;

import java.util.ArrayList;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPg;

@NoArgsConstructor
public class CharacterDTO {
    public String characterName;
    public String playerName;
    // public ClassPg classPg;
    public ArrayList <ClassPg> classPgList;

    public CharacterDTO(Character character){
        this.characterName = character.getCharacterName();
        this.playerName = character.getPlayerName();
        // this.classPg = character.getClassPg();
        this.classPgList = character.getClassPgArray();
    }
    
}