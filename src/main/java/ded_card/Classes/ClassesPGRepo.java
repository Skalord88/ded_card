package ded_card.Classes;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassesPGRepo extends
JpaRepository<ClassesPG, Integer>{

   List<ClassesPG> findByName(int bab);
   
}