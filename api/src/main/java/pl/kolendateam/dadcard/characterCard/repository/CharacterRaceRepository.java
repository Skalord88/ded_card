package pl.kolendateam.dadcard.characterCard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.kolendateam.dadcard.characterCard.entity.CharacterRace;

@Repository
public interface CharacterRaceRepository extends JpaRepository<CharacterRace, Integer> {

}