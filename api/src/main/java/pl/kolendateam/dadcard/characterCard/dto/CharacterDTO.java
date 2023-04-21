package pl.kolendateam.dadcard.characterCard.dto;
import java.util.ArrayList;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.characterCard.entity.Abilitys;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPg;

import java.util.ArrayList;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.classCharacter.MapperClassPgListToDTO;
import pl.kolendateam.dadcard.classCharacter.MapperSavingThrowToDTO;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPgListDTO;
import pl.kolendateam.dadcard.classCharacter.dto.SavingThrowDTO;

@NoArgsConstructor
public class CharacterDTO {
    public String characterName;
    public String playerName;
    public ArrayList <ClassPgListDTO> classPgList;
    public int lep;
    public Abilitys ability;
    public SavingThrowDTO savingThrowsDTO;

    public CharacterDTO(Character character){
        this.characterName = character.getCharacterName();
        this.playerName = character.getPlayerName();
        this.classPgList = MapperClassPgListToDTO.toClassPgListDTO(character.getClassPgArray());
        this.lep = character.getLep();
        this.ability = character.getAbilitys();
        this.savingThrowsDTO = MapperSavingThrowToDTO.toSavingThrowDTO(character.getSavingThrow());
    }
}