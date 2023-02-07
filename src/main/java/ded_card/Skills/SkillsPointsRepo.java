package ded_card.Skills;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillsPointsRepo extends CrudRepository<SkillsPoints,Integer>{
    
}
