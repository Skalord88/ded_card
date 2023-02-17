package ded_card.Classes;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassesRepo extends JpaRepository<Classes,Integer>{
    
    List<Classes> findBaseAttackBonusByClassName(ClassName className);
    List<Classes> findFortitudeByClassName(ClassName className);
    List<Classes> findReflexByClassName(ClassName className);
    List<Classes> findWillByClassName(ClassName className);
    List<Classes> findSkillPointsByClassName(ClassName className);

}
