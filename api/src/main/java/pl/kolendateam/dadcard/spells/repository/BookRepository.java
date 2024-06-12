package pl.kolendateam.dadcard.spells.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.kolendateam.dadcard.spells.entity.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {}
