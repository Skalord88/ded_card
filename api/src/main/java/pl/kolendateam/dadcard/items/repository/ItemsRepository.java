package pl.kolendateam.dadcard.items.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.kolendateam.dadcard.items.entity.Items;

public interface ItemsRepository extends JpaRepository<Items, Short> {}
