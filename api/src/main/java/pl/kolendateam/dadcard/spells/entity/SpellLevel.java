package pl.kolendateam.dadcard.spells.entity;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class SpellLevel implements Serializable {

  int level;

  @Enumerated(EnumType.STRING)
  SpellsEnum classDomain;
}
