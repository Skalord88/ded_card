package pl.kolendateam.dadcard.race.repository;

import org.springframework.stereotype.Repository;

import pl.kolendateam.dadcard.race.entity.Region;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface RegionRepository extends JpaRepository<Region, Integer>{
    
}
