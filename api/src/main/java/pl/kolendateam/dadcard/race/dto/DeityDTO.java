package pl.kolendateam.dadcard.race.dto;

import java.util.Set;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.items.MapperItemsDTO;
import pl.kolendateam.dadcard.items.weapons.dto.WeaponsDTO;
import pl.kolendateam.dadcard.race.MapperRaceToDTO;
import pl.kolendateam.dadcard.race.entity.Deity;
import pl.kolendateam.dadcard.spells.MapperSpells;
import pl.kolendateam.dadcard.spells.dto.DomainsDTO;
import pl.kolendateam.dadcard.spells.repository.SpellsRepository;

@NoArgsConstructor
public class DeityDTO {

  public int id;
  public String name;
  public Set<DomainsDTO> domains;
  public AlignmentDTO alignment;
  public Set<AlignmentDTO> worshiperAlignments;
  public Set<WeaponsDTO> favoredWeapons;
  public String avatarUrl;

  public DeityDTO(Deity deity, SpellsRepository spellsRepository) {
    this.id = deity.getId();
    this.name = deity.getName();
    this.domains =
      MapperSpells.toDomainsDTOSet(deity.getDomains(), spellsRepository);
    this.alignment = MapperRaceToDTO.toAlignmentDTO(deity.getAlignment());
    this.worshiperAlignments =
      MapperRaceToDTO.toAlignmentDTOSet(deity.getWorshiperAlignments());
    this.favoredWeapons =
      MapperItemsDTO.toWeaponDTOSet(deity.getFavoredWeapons());
    this.avatarUrl = deity.getAvatarUrl();
  }
}
