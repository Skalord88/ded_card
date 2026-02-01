package pl.kolendateam.dadcard.spells.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.kolendateam.dadcard.spells.entity.Domains;

public interface DomaninRepository extends JpaRepository<Domains, Integer> {}
