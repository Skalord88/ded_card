package pl.kolendateam.dadcard.characterCard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.kolendateam.dadcard.characterCard.entity.CharacterClass;

@Repository
public interface CharacterClassRepository extends JpaRepository<CharacterClass, Integer> {

    List <CharacterClass> findAll();

    List <CharacterClass> findByClassName(String className);

}

