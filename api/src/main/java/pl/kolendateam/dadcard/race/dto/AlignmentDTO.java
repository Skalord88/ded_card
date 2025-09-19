package pl.kolendateam.dadcard.race.dto;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.race.entity.Alignment;

@NoArgsConstructor
public class AlignmentDTO {

  public int id;
  public String name;
  public String description;
  public String opposingAlignment;

  public AlignmentDTO(Alignment alignment) {
    this.id = alignment.getId();
    this.name = alignment.getName();
    this.description = alignment.getDescription();
    this.opposingAlignment = alignment.getOpposingAlignment();
  }
}
