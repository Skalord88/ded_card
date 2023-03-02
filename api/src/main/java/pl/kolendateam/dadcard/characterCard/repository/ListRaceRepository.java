package pl.kolendateam.dadcard.characterCard.repository;

import java.util.List;

import org.springframework.data.repository.Repository;

import pl.kolendateam.dadcard.characterCard.entity.ListRace;

public interface ListRaceRepository extends Repository<ListRace, Integer>{

    List <ListRace> findByRaceName(String racesName);
    
}
