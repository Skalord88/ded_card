package pl.kolendateam.dadcard.characterCard.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.abilitys.MapperAbilitysToDTO;
import pl.kolendateam.dadcard.abilitys.dto.AbilitysDTO;
import pl.kolendateam.dadcard.armorClass.MapperArmorClassDTO;
import pl.kolendateam.dadcard.armorClass.dto.ArmorClassDTO;
import pl.kolendateam.dadcard.attack.MapperSpecialAttacks;
import pl.kolendateam.dadcard.attack.dto.AttacksDTO;
import pl.kolendateam.dadcard.attack.dto.SpecialAttacksDTO;
import pl.kolendateam.dadcard.attack.entity.Attacks;
import pl.kolendateam.dadcard.characterCard.MapperVitalityToDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.classCharacter.MapperClassPcListToDTO;
import pl.kolendateam.dadcard.classCharacter.MapperSavingThrowToDTO;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPcListDTO;
import pl.kolendateam.dadcard.classCharacter.dto.SavingThrowDTO;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPc;
import pl.kolendateam.dadcard.classCharacter.entity.EnumClass;
import pl.kolendateam.dadcard.feats.MapperCharacterFeatsDTO;
import pl.kolendateam.dadcard.feats.dto.CharacterFeatsDTO;
import pl.kolendateam.dadcard.items.MapperItemsDTO;
import pl.kolendateam.dadcard.items.dto.InventoryDTO;
import pl.kolendateam.dadcard.items.entity.Inventory;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.race.dto.SubRaceBaseDTO;
import pl.kolendateam.dadcard.size.entity.SizeEnum;
import pl.kolendateam.dadcard.skills.MapperSkillsToDTO;
import pl.kolendateam.dadcard.skills.dto.SkillsDTO;
import pl.kolendateam.dadcard.spells.MapperSpellsDTO;
import pl.kolendateam.dadcard.spells.dto.BookDTO;

@AllArgsConstructor
@NoArgsConstructor
public class CharacterDTO implements Serializable {

  public int id;
  public String characterName;
  public String playerName;
  public ArrayList<ClassPcListDTO> classPcList;
  // public SizeEnum size;
  public SubRaceBaseDTO race;
  // public String race;
  // public String subRace;
  // public VitalityDTO vitality;
  public int speed;
  public ArmorClassDTO armorClass;
  // public int bab;
  // public SpecialAttacksDTO specialAttacks;
  // public SavingThrowDTO savingThrows;
  public AbilitysDTO abilitys;
  // public double skillPoints;
  public ArrayList<SkillsDTO> skillsList;
  public ArrayList<CharacterFeatsDTO> featsList;
  public ArrayList<CharacterFeatsDTO> levelFeatsList;
  public ArrayList<Items> items;
  public int inventoryId;
  public InventoryDTO inventory;
  public int attacksId;
  public AttacksDTO attacks;
  public HashMap<EnumClass, Integer[]> magicPerDay;
  public HashMap<EnumClass, Integer[]> magicKnown;
  public ArrayList<BookDTO> books;
  // public ArrayList<SpellsInCharLevel> spellsKnown;
  public int levelAdjustment;
  public int effectiveCharacterLv;
  public int experience;
  public int treasure;

  public CharacterDTO(Character character) {
    this.id = character.getId();
    this.characterName = character.getCharacterName();
    this.playerName = character.getPlayerName();
    this.classPcList =
      MapperClassPcListToDTO.toClassPcListDTO(character.getClassPcArray());
    // this.size = character.sizeCharacter();
    this.race = new SubRaceBaseDTO(character.getRace());
    // this.race = character.getRace();
    // this.subRace = character.getSubRace();
    // this.vitality = MapperVitalityToDTO.toVitalityDTO(character.getVitality());
    this.speed = character.getSpeed();
    this.armorClass =
      MapperArmorClassDTO.toArmorClassDTO(
        character.getArmorClass(),
        character.getAbilitys(),
        character.getSize()
      );
    // this.bab = (int) character.getBab();
    // this.specialAttacks =
    //   MapperSpecialAttacks.toSpecialAttacksDTO(character.getSpecialAttacks());
    // this.savingThrows =
    //   MapperSavingThrowToDTO.toSavingThrowDTO(
    //     character.getSavingThrow(),
    //     character.getAbilitys()
    //   );
    this.abilitys = MapperAbilitysToDTO.toAbilityDTO(character.getAbilitys());
    // this.skillPoints = character.getSkillPoints();
    this.skillsList =
      MapperSkillsToDTO.toSkillsDTO(
        character.getClassSkills(),
        character.getAbilitys()
      );
    this.featsList =
      MapperCharacterFeatsDTO.toCharacterFeatsDTO(character.getFeatsList());
    this.levelFeatsList =
      MapperCharacterFeatsDTO.toCharacterFeatsDTO(
        character.getLevelFeatsList()
      );
    this.inventoryId = character.getInventory().getId();
    this.inventory = null;
    this.inventoryId = character.getAttacks().getId();
    this.inventory = null;
    this.magicPerDay = character.getMagicPerDay();
    this.magicKnown = character.getMagicKnown();
    this.books = MapperSpellsDTO.toBooksDTO(character.getBooks());
    // this.spellsKnown = character.getSpellsKnown();
    this.effectiveCharacterLv = character.getEffectiveCharacterLv();
    this.levelAdjustment = character.getLevelAdjustment();
    this.experience = character.getExperience();
    this.treasure = character.getTreasure();
  }

  public CharacterDTO(Character character, Inventory characterInventory) {
    this.id = character.getId();
    this.characterName = character.getCharacterName();
    this.playerName = character.getPlayerName();
    this.classPcList =
      MapperClassPcListToDTO.toClassPcListDTO(character.getClassPcArray());
    // this.size = character.sizeCharacter();
    this.race = new SubRaceBaseDTO(character.getRace());
    // this.race = character.getRace();
    // this.subRace = character.getSubRace();
    // this.vitality = MapperVitalityToDTO.toVitalityDTO(character.getVitality());
    this.speed = character.getSpeed();
    this.armorClass =
      MapperArmorClassDTO.toArmorClassDTO(
        character.getArmorClass(),
        character.getAbilitys(),
        character.getSize()
      );
    // this.bab = (int) character.getBab();
    // this.specialAttacks =
    //   MapperSpecialAttacks.toSpecialAttacksDTO(character.getSpecialAttacks());
    // this.savingThrows =
    //   MapperSavingThrowToDTO.toSavingThrowDTO(
    //     character.getSavingThrow(),
    //     character.getAbilitys()
    //   );
    this.abilitys = MapperAbilitysToDTO.toAbilityDTO(character.getAbilitys());
    // this.skillPoints = character.getSkillPoints();
    this.skillsList =
      MapperSkillsToDTO.toSkillsDTO(
        character.getClassSkills(),
        character.getAbilitys()
      );
    this.featsList =
      MapperCharacterFeatsDTO.toCharacterFeatsDTO(character.getFeatsList());
    this.levelFeatsList =
      MapperCharacterFeatsDTO.toCharacterFeatsDTO(
        character.getLevelFeatsList()
      );
    this.inventoryId = character.getInventory().getId();
    this.inventory = MapperItemsDTO.toInventoryDTO(characterInventory);
    this.magicPerDay = character.getMagicPerDay();
    this.magicKnown = character.getMagicKnown();
    this.books = MapperSpellsDTO.toBooksDTO(character.getBooks());
    // this.spellsKnown = character.getSpellsKnown();
    this.effectiveCharacterLv = character.getEffectiveCharacterLv();
    this.levelAdjustment = character.getLevelAdjustment();
    this.experience = character.getExperience();
    this.treasure = character.getTreasure();
  }

  public CharacterDTO(Character character, Attacks characterAttacks) {
    this.id = character.getId();
    this.characterName = character.getCharacterName();
    this.playerName = character.getPlayerName();
    this.classPcList =
      MapperClassPcListToDTO.toClassPcListDTO(character.getClassPcArray());
    // this.size = character.sizeCharacter();
    // this.race = character.getRace();
    // this.subRace = character.getSubRace();
    // this.vitality = MapperVitalityToDTO.toVitalityDTO(character.getVitality());
    this.speed = character.getSpeed();
    this.armorClass =
      MapperArmorClassDTO.toArmorClassDTO(
        character.getArmorClass(),
        character.getAbilitys(),
        character.getSize()
      );
    // this.bab = (int) character.getBab();
    // this.specialAttacks =
    //   MapperSpecialAttacks.toSpecialAttacksDTO(character.getSpecialAttacks());
    // this.savingThrows =
    //   MapperSavingThrowToDTO.toSavingThrowDTO(
    //     character.getSavingThrow(),
    //     character.getAbilitys()
    //   );
    this.abilitys = MapperAbilitysToDTO.toAbilityDTO(character.getAbilitys());
    // this.skillPoints = character.getSkillPoints();
    this.skillsList =
      MapperSkillsToDTO.toSkillsDTO(
        character.getClassSkills(),
        character.getAbilitys()
      );
    this.featsList =
      MapperCharacterFeatsDTO.toCharacterFeatsDTO(character.getFeatsList());
    this.levelFeatsList =
      MapperCharacterFeatsDTO.toCharacterFeatsDTO(
        character.getLevelFeatsList()
      );
    this.attacksId = character.getAttacks().getId();
    this.attacks = MapperItemsDTO.toAttacksDTO(characterAttacks);
    this.magicPerDay = character.getMagicPerDay();
    this.magicKnown = character.getMagicKnown();
    this.books = MapperSpellsDTO.toBooksDTO(character.getBooks());
    // this.spellsKnown = character.getSpellsKnown();
    this.effectiveCharacterLv = character.getEffectiveCharacterLv();
    this.levelAdjustment = character.getLevelAdjustment();
    this.experience = character.getExperience();
    this.treasure = character.getTreasure();
  }

  public CharacterDTO(
    Character character,
    Inventory characterInventory,
    Attacks characterAttacks,
    List<ClassPc> characterClassList
  ) {
    this.id = character.getId();
    this.characterName = character.getCharacterName();
    this.playerName = character.getPlayerName();
    this.classPcList =
      MapperClassPcListToDTO.toClassPcListDTO(characterClassList);
    // this.size = character.sizeCharacter();
    this.race = new SubRaceBaseDTO(character.getRace());
    // this.race = character.getRace();
    // this.subRace = character.getSubRace();
    // this.vitality = MapperVitalityToDTO.toVitalityDTO(character.getVitality());
    this.speed = character.getSpeed();
    this.armorClass =
      MapperArmorClassDTO.toArmorClassDTO(
        character.getArmorClass(),
        character.getAbilitys(),
        character.getSize()
      );
    // this.bab = (int) character.getBab();
    // this.specialAttacks =
    //   MapperSpecialAttacks.toSpecialAttacksDTO(character.getSpecialAttacks());
    // this.savingThrows =
    // MapperSavingThrowToDTO.toSavingThrowDTO(
    // character.getSavingThrow(),
    //   character.getAbilitys()
    // );
    this.abilitys = MapperAbilitysToDTO.toAbilityDTO(character.getAbilitys());
    // this.skillPoints = character.getSkillPoints();
    this.skillsList =
      MapperSkillsToDTO.toSkillsDTO(
        character.getClassSkills(),
        character.getAbilitys()
      );
    this.featsList =
      MapperCharacterFeatsDTO.toCharacterFeatsDTO(character.getFeatsList());
    this.levelFeatsList =
      MapperCharacterFeatsDTO.toCharacterFeatsDTO(
        character.getLevelFeatsList()
      );
    this.inventoryId = character.getInventory().getId();
    this.inventory = MapperItemsDTO.toInventoryDTO(characterInventory);
    this.attacksId = character.getAttacks().getId();
    this.attacks = MapperItemsDTO.toAttacksDTO(characterAttacks);
    this.magicPerDay = character.getMagicPerDay();
    this.magicKnown = character.getMagicKnown();
    this.books = MapperSpellsDTO.toBooksDTO(character.getBooks());
    // this.spellsKnown = character.getSpellsKnown();
    this.effectiveCharacterLv = character.getEffectiveCharacterLv();
    this.levelAdjustment = character.getLevelAdjustment();
    this.experience = character.getExperience();
    this.treasure = character.getTreasure();
  }
}
