package pl.kolendateam.dadcard.skills.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.kolendateam.dadcard.skills.entity.Study;

@Repository
public interface StudyRepository extends JpaRepository<Study, Short> {}
