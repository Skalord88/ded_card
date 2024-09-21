package pl.kolendateam.dadcard.classCharacter.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPc;

public interface ClassPcRepository extends JpaRepository<ClassPc, Integer> {
  List<ClassPc> findByCharacter_Id(Integer id);
}
