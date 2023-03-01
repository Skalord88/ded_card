package pl.kolendateam.dadcard.characterCard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.kolendateam.dadcard.characterCard.entity.CharacterCard;

@Repository
public interface CharacterCardRepository extends JpaRepository<CharacterCard, Integer> {

    
}
