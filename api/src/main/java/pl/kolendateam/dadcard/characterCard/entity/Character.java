package pl.kolendateam.dadcard.characterCard.entity;

import java.util.ArrayList;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPg;


@NoArgsConstructor
@Getter
@Setter
@Entity
@RequiredArgsConstructor
public class Character {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;

    @NonNull
    String characterName;

    @NonNull
    String playerName;

    // @JdbcTypeCode(SqlTypes.JSON)
    // ClassPg classPg;

    @JdbcTypeCode(SqlTypes.JSON)
    ArrayList <ClassPg> classPgArray;
    
    public void addClassToPgArray(ClassPg classPg) {
        this.classPgArray.add(classPg);
    }
   
}