package pl.kolendateam.dadcard.items.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.kolendateam.dadcard.items.entity.Items;


@Repository
public interface ItemsRepository extends JpaRepository<Items, Integer>{
    
}
