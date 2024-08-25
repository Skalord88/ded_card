package pl.kolendateam.dadcard.race.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.kolendateam.dadcard.race.entity.SubRace;

@Repository
public interface SubRaceRepository extends JpaRepository<SubRace, Integer> {}
