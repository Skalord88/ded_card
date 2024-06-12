package pl.kolendateam.dadcard.items.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.kolendateam.dadcard.items.entity.Inventory;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Integer> {

}
