package pl.kolendateam.dadcard.classCharacter;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.kolendateam.dadcard.classCharacter.entity.ClassCharacter;

public interface ClassRepository extends JpaRepository<ClassCharacter, Integer>{
    
}
