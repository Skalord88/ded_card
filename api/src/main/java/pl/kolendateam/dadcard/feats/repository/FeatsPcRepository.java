package pl.kolendateam.dadcard.feats.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import pl.kolendateam.dadcard.feats.entity.FeatsPc;

public interface FeatsPcRepository extends JpaRepository<FeatsPc, Integer> {
  List<FeatsPc> findAllByCharacterId(int id);
}
