package pl.kolendateam.dadcard.feats.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.kolendateam.dadcard.feats.entity.ClassFeat;

public interface ClassFeatRepository
  extends JpaRepository<ClassFeat, Integer> {}
