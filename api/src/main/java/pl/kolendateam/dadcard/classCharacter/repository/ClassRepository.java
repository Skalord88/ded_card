package pl.kolendateam.dadcard.classCharacter.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.kolendateam.dadcard.classCharacter.entity.ClassCharacter;

public interface ClassRepository extends JpaRepository<ClassCharacter, Integer>{

    Optional<ClassCharacter> findByNameEquals(String name);
    
}
