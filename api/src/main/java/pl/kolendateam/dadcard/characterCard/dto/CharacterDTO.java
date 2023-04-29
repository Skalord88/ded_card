package pl.kolendateam.dadcard.characterCard.dto;
import java.util.ArrayList;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.abilitys.MapperAbilitysToDTO;
import pl.kolendateam.dadcard.abilitys.dto.AbilitysDTO;
import pl.kolendateam.dadcard.characterCard.MapperVitalityToDTO;
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
    public String subRace;
    public AbilitysDTO abilitys;
    public ArrayList<ClassPcListDTO> classPcList;
    public int ecl;
    public VitalityDTO vitality;
    public int streghtAttack;
    public int dextrityAttack;
    public SavingThrowDTO savingThrows;
    public double skillPoints;
    public ArrayList <SkillsDTO> skillsList;

    public CharacterDTO(Character character) {
        this.characterName = character.getCharacterName();
        this.playerName = character.getPlayerName();
        this.subRace = character.getSubRace();
        this.abilitys = MapperAbilitysToDTO.toAbilityDTO(character.getAbilitys());
        this.classPcList = MapperClassPcListToDTO.toClassPcListDTO(character.getClassPcArray());
        this.ecl = character.getEcl();
        this.vitality = MapperVitalityToDTO.toVitalityDTO(character.getVitality());
        this.streghtAttack = (int) character.getBab()+character.getAbilitys().getStreghtBonus();
        this.dextrityAttack = (int) character.getBab()+character.getAbilitys().getDextrityBonus();
        this.savingThrows = MapperSavingThrowToDTO.toSavingThrowDTO(character.getSavingThrow(),character.getAbilitys());
        this.skillPoints = character.getSkillPoints();
        this.skillsList = MapperSkillsToDTO.toSkillsDTO(character.getClassSkills());
    }

}