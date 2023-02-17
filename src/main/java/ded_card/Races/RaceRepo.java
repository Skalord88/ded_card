package ded_card.Races;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RaceRepo extends JpaRepository<Races,Integer>{

    List<Races> findAllSubRacesNameByRacesName(RacesName RacesName);
    List<Races> findSubRacesBySubRacesName(SubRacesName subRacesName);
    List<Races> findAppraiseBySubRacesName(SubRacesName subRacesName);
        
}
