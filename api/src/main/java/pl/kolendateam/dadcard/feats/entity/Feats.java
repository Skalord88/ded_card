package pl.kolendateam.dadcard.feats.entity;

import java.io.Serializable;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Feats implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Nonnull
    String featName;

    @NonNull
    @Enumerated(EnumType.STRING)
    FeatsTypeEnum featsType;

    String prerequisite;

    @Nonnull
    String description;

    String skills;

    Integer speed;

    String specialAttacks;
    
}
