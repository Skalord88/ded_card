package pl.kolendateam.dadcard.characterCard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.kolendateam.dadcard.characterCard.entity.ListClass;

public interface ListClassRepository extends JpaRepository<ListClass, Integer>{

    List <ListClass> findClassSkillByClassName (String className);
    
}
