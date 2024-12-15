package pl.kolendateam.dadcard.size.dto;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.feats.MapperPrerequisiteBonus;
import pl.kolendateam.dadcard.feats.dto.PrerequisiteDTO;
import pl.kolendateam.dadcard.size.entity.Size;
import pl.kolendateam.dadcard.size.entity.SizeEnum;

@NoArgsConstructor
public class SizeDTO {

  public int id;
  public SizeEnum size;
  public PrerequisiteDTO modifiers;

  public SizeDTO(Size size) {
    this.id = size.getId();
    this.size = size.getSize();
    this.modifiers =
      size.getModifiers() != null
        ? MapperPrerequisiteBonus.toPrerequisiteDTO(size.getModifiers())
        : null;
  }
}
