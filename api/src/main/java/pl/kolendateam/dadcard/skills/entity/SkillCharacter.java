package pl.kolendateam.dadcard.skills.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
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

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class SkillCharacter implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "skill_id", referencedColumnName = "id")
  Skill skill;

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "study_id", referencedColumnName = "id")
  Study study;

  double rank;
}
