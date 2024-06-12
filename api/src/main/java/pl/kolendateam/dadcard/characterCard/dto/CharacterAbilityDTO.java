package pl.kolendateam.dadcard.characterCard.dto;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.abilitys.MapperAbilitysToDTO;
import pl.kolendateam.dadcard.abilitys.dto.AbilitysDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;

@NoArgsConstructor
public class CharacterAbilityDTO {

  public int characterId;
  public String characterName;
  public String playerName;
  public AbilitysDTO abilitys;

  public CharacterAbilityDTO(Character character) {
    this.characterId = character.getId();
    this.characterName = character.getCharacterName();
    this.playerName = character.getPlayerName();
    this.abilitys = MapperAbilitysToDTO.toAbilityDTO(character.getAbilitys());
  }
}
