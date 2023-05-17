package pl.kolendateam.dadcard.feats.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.kolendateam.dadcard.feats.entity.Feats;

@Repository
public interface FeatsRepository extends JpaRepository<Feats, Integer>{
    
}
