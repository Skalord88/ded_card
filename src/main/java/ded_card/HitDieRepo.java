package ded_card;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HitDieRepo extends CrudRepository<HitDie,Integer>{
    
}
