package pl.kolendateam.dadcard.race.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.kolendateam.dadcard.race.entity.RacialRegion;

public interface RacialRegionRepository
  extends JpaRepository<RacialRegion, Integer> {}
