package pl.kolendateam.items.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.kolendateam.items.entity.Items;


@Repository
public interface ItemsRepository extends JpaRepository<Items, Integer>{
    
}
