package pl.kolendateam.dadcard.characterCard.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.abilitys.MapperAbilitysToDTO;
import pl.kolendateam.dadcard.abilitys.dto.AbilitysDTO;
import pl.kolendateam.dadcard.attack.dto.AttacksDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.classCharacter.MapperClassPc;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPcDTO;
import pl.kolendateam.dadcard.feats.MapperFeats;
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
        ? MapperClassPc.toClassPcListDTO(character.getClassPcArray())
        : null;
    this.race =
      character.getRace() != null
        ? MapperRaceToDTO.toSubRaceDTO(character.getRace())
        : null;
    this.archetypes =
      character.getArchetypesList() != null
        ? MaperListRaceToDTO.toSetArchetypeDTO(character.getArchetypesList())
        : null;
    this.abilitys =
      character.getAbilitys() != null
        ? MapperAbilitysToDTO.toAbilityDTO(character.getAbilitys())
        : null;
    this.skillsCharacter =
      character.getSkillsCharacter() != null
        ? MapperSkillToDTO.toSkillCharacterSetDTO(
          character.getSkillsCharacter()
        )
        : null;
    this.featsList =
      character.getFeatsList() != null
        ? MapperFeats.toFeatsPcDTO(character.getFeatsList())
        : null;
    this.inventory = MapperItemsDTO.toInventoryDTO(character.getInventory());
    this.attacks =
      character.getAttacks() != null
        ? MapperItemsDTO.toAttacksDTO(character.getAttacks())
        : null;
    // this.magicPerDay = character.getMagicPerDay();
    // this.magicKnown = character.getMagicKnown();
    this.books =
      character.getBooks() != null
        ? MapperSpellsDTO.toBooksDTO(character.getBooks())
        : null;
    this.experience = character.getExperience();
    this.treasure = character.getTreasure();
  }
}
