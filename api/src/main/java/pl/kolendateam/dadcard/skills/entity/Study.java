package pl.kolendateam.dadcard.skills.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Study implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  @Enumerated(EnumType.STRING)
  ModifierEnum studyName;

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "skill_id", referencedColumnName = "id")
  Skill skill;

  String newStudy;

  public Study(int idStudy) {
    this.id = idStudy;
  }
}
