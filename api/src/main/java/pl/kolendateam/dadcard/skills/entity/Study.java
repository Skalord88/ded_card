package pl.kolendateam.dadcard.skills.entity;

import io.micrometer.common.lang.Nullable;
import jakarta.annotation.Nonnull;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Study implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  short id;

  @Nonnull
  String studyName;

  @Nonnull
  short idSkill;

  @Nullable
  Integer rank;
}
