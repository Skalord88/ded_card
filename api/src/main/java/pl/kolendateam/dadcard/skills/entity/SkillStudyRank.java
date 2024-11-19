package pl.kolendateam.dadcard.skills.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SkillStudyRank {

  Integer SkillId;
  Integer StudyId;
  int rank;
}
