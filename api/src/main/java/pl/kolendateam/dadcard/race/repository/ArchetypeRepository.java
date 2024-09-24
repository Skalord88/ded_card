package pl.kolendateam.dadcard.race.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.kolendateam.dadcard.race.entity.Archetype;

public interface ArchetypeRepository
  extends JpaRepository<Archetype, Integer> {}
