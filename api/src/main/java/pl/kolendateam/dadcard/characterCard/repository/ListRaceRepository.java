package pl.kolendateam.dadcard.characterCard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.kolendateam.dadcard.characterCard.entity.ListRace;

public interface ListRaceRepository extends JpaRepository<ListRace, Integer>{

    List <ListRace> findAll();

    List <ListRace> findByRaceName(String racesName);
    
}
