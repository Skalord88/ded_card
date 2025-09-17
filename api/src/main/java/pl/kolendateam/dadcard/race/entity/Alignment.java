package pl.kolendateam.dadcard.race.entity;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Alignment {

  int id;
  String name;
  String description;
  String opposingAlignment;
}
