package pl.kolendateam.dadcard.abilitys.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AbilityToSendDTO {

  public AbilitysDTO abilitysDTO;
  public List<LevelAbilitysDTO> lvAbilitysDTO;
}
