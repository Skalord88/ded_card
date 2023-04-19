package pl.kolendateam.dadcard.characterCard.dto;

import java.util.ArrayList;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.classCharacter.MapperClassPcListToDTO;
import pl.kolendateam.dadcard.classCharacter.MapperSavingThrowToDTO;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPcListDTO;
import pl.kolendateam.dadcard.classCharacter.dto.SavingThrowDTO;

@NoArgsConstructor
public class CharacterDTO {
    public String characterName;
    public String playerName;
    public ArrayList<ClassPcListDTO> classPcDTOList;
    public int ecl;
    public SavingThrowDTO savingThrowsDTO;
    public int bab;

    public CharacterDTO(Character character) {
        this.characterName = character.getCharacterName();
        this.playerName = character.getPlayerName();
        this.classPcDTOList = MapperClassPcListToDTO.toClassPcListDTO(character.getClassPcArray());
        this.ecl = character.getEcl();
        this.savingThrowsDTO = MapperSavingThrowToDTO.toSavingThrowDTO(character.getSavingThrow());
        this.bab = (int) character.getBab();
    }

}