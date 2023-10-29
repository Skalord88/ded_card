package pl.kolendateam.dadcard.characterCard.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.abilitys.MapperAbilitysToDTO;
import pl.kolendateam.dadcard.abilitys.dto.AbilitysDTO;
import pl.kolendateam.dadcard.armorClass.MapperArmorClassDTO;
import pl.kolendateam.dadcard.armorClass.dto.ArmorClassDTO;
import pl.kolendateam.dadcard.attack.MapperSpecialAttacks;
import pl.kolendateam.dadcard.attack.dto.SpecialAttacksDTO;
import pl.kolendateam.dadcard.characterCard.MapperVitalityToDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.characterCard.entity.SpellsInCharLevel;
import pl.kolendateam.dadcard.classCharacter.MapperClassPcListToDTO;
import pl.kolendateam.dadcard.classCharacter.MapperSavingThrowToDTO;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPcListDTO;
import pl.kolendateam.dadcard.classCharacter.dto.SavingThrowDTO;
import pl.kolendateam.dadcard.classCharacter.entity.EnumClass;
import pl.kolendateam.dadcard.feats.MapperCharacterFeatsDTO;
import pl.kolendateam.dadcard.feats.dto.CharacterFeatsDTO;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.size.entity.SizeEnum;
import pl.kolendateam.dadcard.skills.MapperSkillsToDTO;
import pl.kolendateam.dadcard.skills.dto.SkillsDTO;
import pl.kolendateam.dadcard.spells.entity.SpellsEnum;

@AllArgsConstructor
@NoArgsConstructor
public class CharacterDTO implements Serializable {
    public String characterName;
    public String playerName;
    public String race;
    public String subRace;
    public SizeEnum size;
    public int speed;
    public AbilitysDTO abilitys;
    public ArrayList<ClassPcListDTO> classPcList;
    public int effectiveCharacterLv;
    public VitalityDTO vitality;
    public int bab;
    public ArmorClassDTO armorClass;
    public SavingThrowDTO savingThrows;
    public double skillPoints;
    public SpecialAttacksDTO specialAttacks;
    public ArrayList<SkillsDTO> skillsList;
    public ArrayList<CharacterFeatsDTO> featsList;
    public ArrayList<Items> items;
    public HashMap <EnumClass,Integer[]> magicPerDay;
    public HashMap <EnumClass,Integer[]> magicKnown;
    public HashMap <EnumClass,ArrayList<SpellsInCharLevel>> spellsKnown;

    public CharacterDTO(Character character) {
        this.characterName = character.getCharacterName();
        this.playerName = character.getPlayerName();
        this.race = character.getRace();
        this.subRace = character.getSubRace();
        this.size = character.sizeCharacter();
        this.speed = character.getSpeed();
        this.abilitys = MapperAbilitysToDTO.toAbilityDTO(character.getAbilitys());
        this.classPcList = MapperClassPcListToDTO.toClassPcListDTO(character.getClassPcArray());
        this.effectiveCharacterLv = character.getEffectiveCharacterLv() + character.getLevelAdjustment();
        this.vitality = MapperVitalityToDTO.toVitalityDTO(character.getVitality());
        this.bab = (int) character.getBab();
        this.armorClass = MapperArmorClassDTO.toArmorClassDTO(character.getArmorClass(),character.getAbilitys(),character.getSize());
        this.savingThrows = MapperSavingThrowToDTO.toSavingThrowDTO(character.getSavingThrow(),character.getAbilitys());
        this.skillPoints = character.getSkillPoints();
        this.specialAttacks = MapperSpecialAttacks.toSpecialAttacksDTO(character.getSpecialAttacks());
        this.skillsList = MapperSkillsToDTO.toSkillsDTO(character.getClassSkills(), character.getAbilitys());
        this.featsList = MapperCharacterFeatsDTO.toCharacterFeatsDTO(character.getFeatsList());
        this.items = character.getItems();
        this.magicPerDay = character.getMagicPerDay();
        this.magicKnown = character.getMagicKnown();
        this.spellsKnown = character.getSpellsKnown();
    }

}