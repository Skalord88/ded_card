package pl.kolendateam.dadcard.characterCard.dto;
import java.util.ArrayList;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.abilitys.MapperAbilitysToDTO;
import pl.kolendateam.dadcard.abilitys.dto.AbilitysDTO;
import pl.kolendateam.dadcard.armorClass.MapperArmorClassDTO;
import pl.kolendateam.dadcard.armorClass.dto.ArmorClassDTO;
import pl.kolendateam.dadcard.attack.entity.SpecialAttacks;
import pl.kolendateam.dadcard.characterCard.MapperVitalityToDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.classCharacter.MapperClassPcListToDTO;
import pl.kolendateam.dadcard.classCharacter.MapperSavingThrowToDTO;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPcListDTO;
import pl.kolendateam.dadcard.classCharacter.dto.SavingThrowDTO;
import pl.kolendateam.dadcard.feats.MapperFeatsDTO;
import pl.kolendateam.dadcard.feats.dto.FeatsDTO;
import pl.kolendateam.dadcard.size.entity.SizeEnum;
import pl.kolendateam.dadcard.skills.MapperSkillsToDTO;
import pl.kolendateam.dadcard.skills.dto.SkillsDTO;

@NoArgsConstructor
public class CharacterDTO {
    public String characterName;
    public String playerName;
    public String race;
    public String subRace;
    public SizeEnum size;
    public int speed;
    public AbilitysDTO abilitys;
    public ArrayList<ClassPcListDTO> classPcList;
    public int ecl;
    public VitalityDTO vitality;
    public int streghtAttack;
    public int dextrityAttack;
    public ArmorClassDTO armorClass;
    public SavingThrowDTO savingThrows;
    public double skillPoints;
    public SpecialAttacks specialAttacks;
    public ArrayList<SkillsDTO> skillsList;
    public ArrayList<FeatsDTO> featsList;

    public CharacterDTO(Character character) {
        this.characterName = character.getCharacterName();
        this.playerName = character.getPlayerName();
        this.race = character.getRace();
        this.subRace = character.getSubRace();
        this.size = character.getSize().getSize();
        this.speed = character.getSpeed();
        this.abilitys = MapperAbilitysToDTO.toAbilityDTO(character.getAbilitys());
        this.classPcList = MapperClassPcListToDTO.toClassPcListDTO(character.getClassPcArray());
        this.ecl = character.getEcl()+character.getLevelAdjustment();
        if(character.getVitality()==null){
            this.vitality = null;
        } else {this.vitality = MapperVitalityToDTO.toVitalityDTO(character.getVitality());}
        if(character.getArmorClass()==null){
            this.armorClass = null;
        } else {
            this.armorClass = MapperArmorClassDTO.toArmorClassDTO(character.getArmorClass(),character.getAbilitys(),character.getSize());}
        this.savingThrows = MapperSavingThrowToDTO.toSavingThrowDTO(character.getSavingThrow(),character.getAbilitys());
        this.skillPoints = character.getSkillPoints();
        this.specialAttacks = character.getSpecialAttacks();
        if(character.getClassSkills()==null){
            this.skillsList = null;
        } else {
            this.skillsList = MapperSkillsToDTO.toSkillsDTO(character.getClassSkills(),character.getAbilitys());}
        if(character.getFeatsList()==null){
            this.featsList = null;
        } else {
            this.featsList = MapperFeatsDTO.toFeatsDTO(character.getFeatsList());}
    }

}