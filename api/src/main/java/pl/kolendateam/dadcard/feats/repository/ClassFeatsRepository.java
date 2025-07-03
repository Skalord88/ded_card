package pl.kolendateam.dadcard.feats.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.kolendateam.dadcard.feats.entity.ClassFeats;

public interface ClassFeatsRepository
  extends JpaRepository<ClassFeats, Integer> {}
