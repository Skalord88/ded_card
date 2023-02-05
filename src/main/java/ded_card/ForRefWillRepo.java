package ded_card;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForRefWillRepo extends CrudRepository<ForRefWill,Integer>{
    
}
