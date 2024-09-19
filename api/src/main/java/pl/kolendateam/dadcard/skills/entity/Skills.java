package pl.kolendateam.dadcard.skills.entity;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import pl.kolendateam.dadcard.abilitys.entity.AbilityEnum;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Skills {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  short id;

  String name;

  @Enumerated(EnumType.STRING)
  AbilityEnum ability;
}
