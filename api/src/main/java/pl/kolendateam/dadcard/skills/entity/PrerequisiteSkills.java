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
import jakarta.persistence.Table;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;
import pl.kolendateam.dadcard.skills.dto.PrerequisiteSkillDTO;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "prerequisite_skill")
public class PrerequisiteSkills implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "skill_id", referencedColumnName = "id")
  Skill skill;

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "study_id", referencedColumnName = "id")
  Study study;

  int rank;

  @Enumerated(EnumType.STRING)
  ModifierEnum modifierBonus;

  @JdbcTypeCode(SqlTypes.JSON)
  ModifierEnum[] target;

  public PrerequisiteSkills(PrerequisiteSkillDTO skillDTO) {
    this.skill = skillDTO.skill.id != 0 ? new Skill(skillDTO.skill.id) : null;
    this.study = skillDTO.study.id != 0 ? new Study(skillDTO.study.id) : null;
    this.modifierBonus = skillDTO.modifierBonus;
    this.rank = skillDTO.rank;
    this.target = skillDTO.target != null ? skillDTO.target : null;
  }
}
