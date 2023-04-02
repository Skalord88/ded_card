package pl.kolendateam.dadcard.characterCard.dto;

import java.util.ArrayList;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.classCharacter.MapperClassPgListToDTO;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPgListDTO;
import pl.kolendateam.dadcard.classCharacter.entity.SavingThrow;

@NoArgsConstructor
public class CharacterDTO {
    public String characterName;
    public String playerName;
    public ArrayList <ClassPgListDTO> classPgDTOList;
    public int lep;
    public SavingThrow savingThrowsList;

    public CharacterDTO(Character character){
        this.characterName = character.getCharacterName();
        this.playerName = character.getPlayerName();
        this.classPgDTOList = MapperClassPgListToDTO.toClassPgListDTO(character.getClassPgArray());
        this.lep = character.getLep();
        this.savingThrowsList = character.getSavingThrow();
    }
    
}