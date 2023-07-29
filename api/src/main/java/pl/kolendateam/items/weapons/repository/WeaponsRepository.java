package pl.kolendateam.items.weapons.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.kolendateam.items.weapons.entity.Weapons;

public interface WeaponsRepository extends JpaRepository<Weapons,Integer>{
    
}
