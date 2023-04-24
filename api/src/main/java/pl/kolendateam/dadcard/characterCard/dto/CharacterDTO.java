package pl.kolendateam.dadcard.characterCard.dto;
import java.util.ArrayList;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.classCharacter.MapperClassPcListToDTO;
import pl.kolendateam.dadcard.classCharacter.MapperSavingThrowToDTO;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPcListDTO;
import pl.kolendateam.dadcard.classCharacter.dto.SavingThrowDTO;
import pl.kolendateam.dadcard.skills.MapperSkillsToDTO;
import pl.kolendateam.dadcard.skills.dto.SkillsDTO;

@NoArgsConstructor
public class CharacterDTO {
    public String characterName;
    public String playerName;
    public ArrayList <ClassPcListDTO> classPcList;
    public int lep;
    public SavingThrowDTO savingThrows;
    public double skillPoints;
    public ArrayList <SkillsDTO> skillsList;

    public CharacterDTO(Character character){
        this.characterName = character.getCharacterName();
        this.playerName = character.getPlayerName();
        this.classPcList = MapperClassPcListToDTO.toClassPcListDTO(character.getClassPcArray());
        this.lep = character.getLep();
        this.savingThrows = MapperSavingThrowToDTO.toSavingThrowDTO(character.getSavingThrow());
        this.skillPoints = character.getSkillPoints();
        this.skillsList = MapperSkillsToDTO.toSkillsDTO(character.getClassSkills());
    }
    
}