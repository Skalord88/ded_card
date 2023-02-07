package ded_card.Skills;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillsRepo extends CrudRepository<Skills, Integer>{
    
    Skills findByName(String name);

}
