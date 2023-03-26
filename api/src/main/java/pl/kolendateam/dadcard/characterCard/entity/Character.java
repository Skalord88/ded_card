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
import pl.kolendateam.dadcard.classCharacter.dto.ClassPgDTO;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPg;

@NoArgsConstructor
@Getter
@Setter
@Entity
@RequiredArgsConstructor
public class Character {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @NonNull
    String characterName;

    @NonNull
    String playerName;

    @JdbcTypeCode(SqlTypes.JSON)
    ArrayList <ClassPg> classPg;
    
}
