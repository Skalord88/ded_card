package pl.kolendateam.dadcard.abilitys.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.kolendateam.dadcard.abilitys.entity.AbilityBonus;

@Repository
public interface AbilityBonusRepository extends JpaRepository<AbilityBonus, Integer>{

    Optional <AbilityBonus> findBonusByValue (int getStreght);
    
}
