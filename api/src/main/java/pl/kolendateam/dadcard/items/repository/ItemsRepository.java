package pl.kolendateam.dadcard.items.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import pl.kolendateam.dadcard.items.entity.Items;


@NoRepositoryBean
public interface ItemsRepository extends JpaRepository<Items, Integer>{
    
}
