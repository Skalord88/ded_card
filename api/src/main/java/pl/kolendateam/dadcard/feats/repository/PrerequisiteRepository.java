package pl.kolendateam.dadcard.feats.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.kolendateam.dadcard.modifier.entity.Prerequisite;

@Repository
public interface PrerequisiteRepository
  extends JpaRepository<Prerequisite, Integer> {
  List<Prerequisite> findAllByIdIn(List<Integer> checkListPrerequisite);
}
