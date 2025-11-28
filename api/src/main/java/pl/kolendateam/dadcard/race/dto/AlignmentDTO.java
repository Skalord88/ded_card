package pl.kolendateam.dadcard.race.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.race.entity.Alignment;
import pl.kolendateam.dadcard.race.entity.AlignmentEnum;

@NoArgsConstructor
public class AlignmentDTO {

  public int id;
  public AlignmentEnum name;
  public String description;
  public String opposingAlignment;

  public AlignmentDTO(Alignment alignment) {
    this.id = alignment.getId();
    this.name = alignment.getName();
    this.description = alignment.getDescription();
    this.opposingAlignment = alignment.getOpposingAlignment();
  }
}
