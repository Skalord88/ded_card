package pl.kolendateam.dadcard.skills.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.kolendateam.dadcard.skills.entity.Skills;

@Repository
public interface SkillsRepository extends JpaRepository<Skills, Short>{
    
}
