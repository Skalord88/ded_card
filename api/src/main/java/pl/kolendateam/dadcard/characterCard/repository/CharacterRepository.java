package pl.kolendateam.dadcard.characterCard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.kolendateam.dadcard.characterCard.entity.Character;

@Repository
public interface CharacterRepository extends JpaRepository<Character, Integer> {

    
    
}