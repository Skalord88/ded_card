package ded_card;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AbilitiesRepo extends CrudRepository<Abilities,Integer>{
    
}
