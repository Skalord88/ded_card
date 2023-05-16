package pl.kolendateam.dadcard.feats.entity;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Feats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Nonnull
    String featName;

    @Nonnull
    FeatsTypeEnum featsType;

    String prerequisite;

    @Nonnull
    String description;

    String skills;
    
}
