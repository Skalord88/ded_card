package ded_card.mod;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModAbilitiesRepo  extends JpaRepository<ModAbilities,Integer>{

    List<ModAbilities> findModAbilitiesByAbilities(int abilities);
    
}
