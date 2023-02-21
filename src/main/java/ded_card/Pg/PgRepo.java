package ded_card.Pg;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PgRepo extends CrudRepository<Pg,Integer>{

    List<Pg> findPgByPgName(String pgName);
    List<Pg> findByPgId(int pgId);
    
}
