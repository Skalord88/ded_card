package pl.kolendateam.dadcard.feats.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import pl.kolendateam.dadcard.feats.entity.FeatPc;

public interface FeatPcRepository extends JpaRepository<FeatPc, Integer> {
  List<FeatPc> findAllByCharacterId(int id);
}
