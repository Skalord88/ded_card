package pl.kolendateam.dadcard.weapons.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.kolendateam.dadcard.weapons.entity.Weapons;

public interface WeaponsRepository extends JpaRepository<Weapons,Integer>{
    
}
