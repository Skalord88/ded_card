package pl.kolendateam.dadcard.characterCard.dto;

import java.util.ArrayList;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.classCharacter.MapperClassPgListToDTO;
import pl.kolendateam.dadcard.classCharacter.MapperSavingThrowToDTO;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPgListDTO;
import pl.kolendateam.dadcard.classCharacter.dto.SavingThrowDTO;
import pl.kolendateam.dadcard.skills.MapperSkillsToDTO;
import pl.kolendateam.dadcard.skills.dto.SkillsDTO;

@NoArgsConstructor
public class CharacterDTO {
    public String characterName;
    public String playerName;
    public ArrayList <ClassPgListDTO> classPgList;
    public int lep;
    public SavingThrowDTO savingThrows;
    public ArrayList <SkillsDTO> skillsList; 

    public CharacterDTO(Character character){
        this.characterName = character.getCharacterName();
        this.playerName = character.getPlayerName();
        this.classPgList = MapperClassPgListToDTO.toClassPgListDTO(character.getClassPgArray());
        this.lep = character.getLep();
        this.savingThrows = MapperSavingThrowToDTO.toSavingThrowDTO(character.getSavingThrow());
        this.skillsList = MapperSkillsToDTO.toSkillsDTO(character.getClassSkills());
    }
    
}