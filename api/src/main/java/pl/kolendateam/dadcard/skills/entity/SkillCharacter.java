package pl.kolendateam.dadcard.skills.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.skills.dto.SkillToAddDTO;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "skills_character")
public class SkillCharacter implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  @ManyToOne
  @JoinColumn(name = "character_card_id")
  Character character;

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "skill_id", referencedColumnName = "id")
  Skill skill;

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "study_id", referencedColumnName = "id")
  Study study;

  int rank;

  public SkillCharacter(SkillToAddDTO dto, int charId) {
    if (dto.idSkill != 0) {
      this.skill = new Skill(dto.idSkill);
    }
    if (dto.idStudy != 0) {
      this.study = new Study(dto.idStudy);
    }
    this.rank = dto.rank;
    this.character = new Character(charId);
  }
}
