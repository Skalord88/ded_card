package pl.kolendateam.dadcard.characterCard.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@RequiredArgsConstructor
public class CharacterAbility {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @NonNull
    private int streght;
    @NonNull
    private int dextrity;
    @NonNull
    private int constitution;
    @NonNull
    private int intelligence;
    @NonNull
    private int wisdom;
    @NonNull
    private int charisma;

    
    
}
