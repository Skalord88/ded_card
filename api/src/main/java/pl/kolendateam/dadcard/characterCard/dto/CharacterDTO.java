package pl.kolendateam.dadcard.characterCard.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.abilitys.MapperAbilitysToDTO;
import pl.kolendateam.dadcard.abilitys.dto.AbilitysDTO;
import pl.kolendateam.dadcard.attack.dto.AttacksDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.classCharacter.MapperClassFeatsDTO;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPcListDTO;
import pl.kolendateam.dadcard.classCharacter.entity.EnumClass;
import pl.kolendateam.dadcard.feats.MapperFeatsDTO;
import pl.kolendateam.dadcard.feats.dto.FeatsDTO;
import pl.kolendateam.dadcard.items.MapperItemsDTO;
import pl.kolendateam.dadcard.items.dto.InventoryDTO;
import pl.kolendateam.dadcard.race.MapperRaceToDTO;
import pl.kolendateam.dadcard.race.dto.SubRaceDTO;
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
  public SubRaceDTO race;
  public AbilitysDTO abilitys;
  public ArrayList<SkillsDTO> skillsList;
  public ArrayList<FeatsDTO> featsList;
  public InventoryDTO inventory;
  public AttacksDTO attacks;
  public HashMap<EnumClass, Integer[]> magicPerDay;
  public HashMap<EnumClass, Integer[]> magicKnown;
  public ArrayList<BookDTO> books;
  public int levelAdjustment;
  public int effectiveCharacterLv;
  public int experience;
  public int treasure;

  public CharacterDTO(Character character) {
    this.id = character.getId();
    this.characterName = character.getCharacterName();
    this.playerName = character.getPlayerName();
    this.classPcList =
      MapperClassFeatsDTO.toClassPcListDTO(character.getClassPcArray());
    this.race = MapperRaceToDTO.toSubRaceDTO(character.getRace());
    this.abilitys = MapperAbilitysToDTO.toAbilityDTO(character.getAbilitys());
    this.skillsList =
      MapperSkillsToDTO.toSkillsListDTO(character.getClassSkills());
    this.featsList = MapperFeatsDTO.toFeatsDTO(character.getFeatsList());
    this.inventory = MapperItemsDTO.toInventoryDTO(character.getInventory());
    this.attacks = MapperItemsDTO.toAttacksDTO(character.getAttacks());
    this.magicPerDay = character.getMagicPerDay();
    this.magicKnown = character.getMagicKnown();
    this.books = MapperSpellsDTO.toBooksDTO(character.getBooks());
    this.experience = character.getExperience();
    this.treasure = character.getTreasure();
  }
}
