package pl.kolendateam.dadcard.feats.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.kolendateam.dadcard.feats.entity.Feat;

@Repository
public interface FeatRepository extends JpaRepository<Feat, Integer> {
  List<Feat> findAllByIdIn(List<Integer> checkListFeat);
}
