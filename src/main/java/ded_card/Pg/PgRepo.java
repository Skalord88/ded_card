package ded_card.Pg;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PgRepo extends JpaRepository<Pg,Integer>{

        
}
