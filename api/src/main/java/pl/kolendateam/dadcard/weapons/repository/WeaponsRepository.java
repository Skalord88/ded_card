package pl.kolendateam.dadcard.weapons.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.kolendateam.dadcard.weapons.entity.Weapons;

@Repository
public interface WeaponsRepository extends JpaRepository<Weapons, Integer>{
    
}
