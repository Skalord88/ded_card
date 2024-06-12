package pl.kolendateam.dadcard.attack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.kolendateam.dadcard.attack.entity.Attacks;

public interface AttacksRepository extends JpaRepository<Attacks, Integer> {

}
