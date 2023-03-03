package pl.kolendateam.dadcard.characterCard.entity;

import jakarta.persistence.Column;
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
public class CharacterCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;

    @NonNull
    @Column(nullable=false)
    private int streght;

    @NonNull
    @Column(nullable=false)
    private int dextrity;

    @NonNull
    @Column(nullable=false)
    private int constitution;

    @NonNull
    @Column(nullable=false)
    private int intelligence;

    @NonNull
    @Column(nullable=false)
    private int wisdom;

    @NonNull
    @Column(nullable=false)
    private int charisma;

}
