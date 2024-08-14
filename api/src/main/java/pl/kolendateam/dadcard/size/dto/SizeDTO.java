package pl.kolendateam.dadcard.size.dto;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.size.entity.Size;
import pl.kolendateam.dadcard.size.entity.SizeEnum;

@NoArgsConstructor
public class SizeDTO {

  public int id;
  public SizeEnum size;
  public int bonus;
  public int hide;
  public int grapple;

  public SizeDTO(Size size) {
    this.id = size.getId();
    this.size = size.getSize();
    this.bonus = size.getBonus();
    this.hide = size.getHide();
    this.grapple = size.getGrapple();
  }
}
