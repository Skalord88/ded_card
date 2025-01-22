package pl.kolendateam.dadcard.characterCard.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.abilitys.MapperAbilitysToDTO;
import pl.kolendateam.dadcard.abilitys.dto.AbilitysDTO;
import pl.kolendateam.dadcard.attack.dto.AttacksDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.classCharacter.MapperClassPcDTO;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPcDTO;
import pl.kolendateam.dadcard.classCharacter.entity.EnumClass;
import pl.kolendateam.dadcard.feats.MapperFeatsDTO;
import pl.kolendateam.dadcard.feats.dto.FeatsPcDTO;
import pl.kolendateam.dadcard.items.MapperItemsDTO;
import pl.kolendateam.dadcard.items.dto.InventoryDTO;
import pl.kolendateam.dadcard.race.MaperListRaceToDTO;
import pl.kolendateam.dadcard.race.MapperRaceToDTO;
import pl.kolendateam.dadcard.race.dto.ArchetypeDTO;
import pl.kolendateam.dadcard.race.dto.SubRaceDTO;
import pl.kolendateam.dadcard.skills.MapperSkillToDTO;
import pl.kolendateam.dadcard.skills.dto.SkillCharacterDTO;
import pl.kolendateam.dadcard.spells.MapperSpellsDTO;
import pl.kolendateam.dadcard.spells.dto.BookDTO;

@AllArgsConstructor
@NoArgsConstructor
public class CharacterDTO implements Serializable {

  public int id;
  public String characterName;
  public String playerName;
  public List<ClassPcDTO> classPcList;
  public SubRaceDTO race;
  public Set<ArchetypeDTO> archetypes;
  public AbilitysDTO abilitys;
  public Set<SkillCharacterDTO> skillsCharacter;
  public ArrayList<FeatsPcDTO> featsList;
  public InventoryDTO inventory;
  public AttacksDTO attacks;
  // public HashMap<EnumClass, Integer[]> magicPerDay;
  // public HashMap<EnumClass, Integer[]> magicKnown;
  public ArrayList<BookDTO> books;
  public int experience;
  public int treasure;

  public CharacterDTO(Character character) {
    this.id = character.getId();
    this.characterName = character.getCharacterName();
    this.playerName = character.getPlayerName();
    this.classPcList =
      character.getClassPcArray() != null
        ? MapperClassPcDTO.toClassPcList(character.getClassPcArray())
        : null;
    this.race =
      character.getRace() != null
        ? MapperRaceToDTO.toSubRaceDTO(character.getRace())
        : null;
    this.archetypes =
      MaperListRaceToDTO.toSetArchetypeDTO(character.getArchetypesList());
    this.abilitys = MapperAbilitysToDTO.toAbilityDTO(character.getAbilitys());
    this.skillsCharacter =
      MapperSkillToDTO.toSkillCharacterSetDTO(character.getSkillsCharacter());
    this.featsList = MapperFeatsDTO.toFeatsPcDTO(character.getFeatsList());
    this.inventory = MapperItemsDTO.toInventoryDTO(character.getInventory());
    this.attacks = MapperItemsDTO.toAttacksDTO(character.getAttacks());
    // this.magicPerDay = character.getMagicPerDay();
    // this.magicKnown = character.getMagicKnown();
    this.books = MapperSpellsDTO.toBooksDTO(character.getBooks());
    this.experience = character.getExperience();
    this.treasure = character.getTreasure();
  }
}
