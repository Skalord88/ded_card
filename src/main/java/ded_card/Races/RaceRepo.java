package ded_card.Races;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RaceRepo extends JpaRepository<Races,Integer>{

    Races findByName(String subRacesName);
    
}
