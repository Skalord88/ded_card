package pl.kolendateam.dadcard.spells.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.kolendateam.dadcard.spells.entity.Spells;

@Repository
public interface SpellsRepository extends JpaRepository<Spells, Integer> {
    
}
