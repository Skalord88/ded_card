package pl.kolendateam.dadcard.race.repository;

import org.springframework.stereotype.Repository;

import pl.kolendateam.dadcard.race.entity.Race;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface RaceRepository extends JpaRepository<Race, Short>{
    
}
