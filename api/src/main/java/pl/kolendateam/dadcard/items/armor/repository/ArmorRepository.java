package pl.kolendateam.dadcard.items.armor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.kolendateam.dadcard.items.armor.entity.Armors;

public interface ArmorRepository extends JpaRepository<Armors, Integer> {

}
