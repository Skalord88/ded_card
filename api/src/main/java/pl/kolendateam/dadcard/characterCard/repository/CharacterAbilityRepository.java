package pl.kolendateam.dadcard.characterCard.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.kolendateam.dadcard.characterCard.entity.CharacterAbility;

public interface CharacterAbilityRepository extends JpaRepository<CharacterAbility, Integer>  {
    
}
