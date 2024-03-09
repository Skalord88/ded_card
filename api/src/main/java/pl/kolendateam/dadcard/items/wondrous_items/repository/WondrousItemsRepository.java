package pl.kolendateam.dadcard.items.wondrous_items.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.kolendateam.dadcard.items.wondrous_items.entity.WondrousItems;

public interface WondrousItemsRepository
  extends JpaRepository<WondrousItems, Short> {}
