package pl.kolendateam.dadcard.characterCard.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.abilitys.MapperAbilitys;
import pl.kolendateam.dadcard.abilitys.dto.AbilitysDTO;
import pl.kolendateam.dadcard.abilitys.dto.LevelAbilitysDTO;
import pl.kolendateam.dadcard.attack.dto.AttacksDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.classCharacter.MapperClassPc;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPcDTO;
import pl.kolendateam.dadcard.feats.MapperFeats;
import pl.kolendateam.dadcard.feats.dto.FeatPcDTO;
import pl.kolendateam.dadcard.items.MapperItemsDTO;
import pl.kolendateam.dadcard.items.dto.InventoryDTO;
import pl.kolendateam.dadcard.race.MaperListRaceToDTO;
import pl.kolendateam.dadcard.race.MapperRaceToDTO;
import pl.kolendateam.dadcard.race.dto.AlignmentDTO;
import pl.kolendateam.dadcard.race.dto.ArchetypeDTO;
import pl.kolendateam.dadcard.race.dto.DeityDTO;
import pl.kolendateam.dadcard.race.dto.RacialRegionDTO;
import pl.kolendateam.dadcard.race.dto.RegionDTO;
import pl.kolendateam.dadcard.race.dto.SubRaceDTO;
import pl.kolendateam.dadcard.skills.MapperSkill;
import pl.kolendateam.dadcard.skills.dto.SkillCharacterDTO;
import pl.kolendateam.dadcard.spells.MapperSpells;
import pl.kolendateam.dadcard.spells.dto.BookDTO;
import pl.kolendateam.dadcard.spells.dto.DomainsDTO;

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
  public List<LevelAbilitysDTO> characterLevelAbilitys;
  public Set<SkillCharacterDTO> skillsCharacter;
  public ArrayList<FeatPcDTO> featsList;
  public InventoryDTO inventory;
  public AttacksDTO attacks;
  // public HashMap<EnumClass, Integer[]> magicPerDay;
  // public HashMap<EnumClass, Integer[]> magicKnown;
  public ArrayList<BookDTO> books;
  public int experience;
  public int treasure;
  public Set<DomainsDTO> domains;
  public DeityDTO deity;
  public RacialRegionDTO region;
  public AlignmentDTO alignment;

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
        ? MapperAbilitys.toAbilityDTO(character.getAbilitys())
        : null;
    this.characterLevelAbilitys =
      character.getCharacterLevelAbilitys() != null
        ? character
          .getCharacterLevelAbilitys()
          .stream()
          .map(MapperAbilitys::toLevelAbilityDTO)
          .collect(ArrayList::new, ArrayList::add, ArrayList::addAll)
        : null;
    this.skillsCharacter =
      character.getSkillsCharacter() != null
        ? MapperSkill.toSkillCharacterSetDTO(character.getSkillsCharacter())
        : null;
    this.featsList =
      character.getFeatsList() != null
        ? MapperFeats.toFeatsPcDTO(character.getFeatsList())
        : null;
    this.inventory =
      character.getInventory() != null
        ? MapperItemsDTO.toInventoryDTO(character.getInventory())
        : null;
    this.attacks =
      character.getAttacks() != null
        ? MapperItemsDTO.toAttacksDTO(character.getAttacks())
        : null;
    this.books =
      character.getBooks() != null
        ? MapperSpells.toBooksDTO(character.getBooks())
        : null;
    this.experience = character.getExperience();
    this.treasure = character.getTreasure();
    this.domains = MapperSpells.toDomainsDTOSet(character.getDomains());
    this.deity = MapperRaceToDTO.toDeityDTO(character.getDeity());
    this.region =
      MapperRaceToDTO.toRegionFromRacialRegionDTO(character.getRegion());
    this.alignment =
      character.getAlignment() != null
        ? MapperRaceToDTO.toAlignmentDTO(character.getAlignment())
        : null;
  }
}
