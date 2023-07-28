package pl.kolendateam.items.weapons.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.kolendateam.items.weapons.entity.Weapons;

@Repository
public interface WeaponsRepository extends JpaRepository<Weapons, Integer>{
    
}
