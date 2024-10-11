package pl.kolendateam.dadcard.feats.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.feats.entity.Prerequisite;

@AllArgsConstructor
@NoArgsConstructor
public class PrerequisiteDTO {

  public String type;
  public int id;

  public PrerequisiteDTO(Prerequisite pre) {
    this.type = pre.getType();
    this.id = pre.getId();
  }
}
