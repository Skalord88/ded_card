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

    String featSpecial;

    @NonNull
    @Enumerated(EnumType.STRING)
    FeatsTypeEnum featsType;

    String prerequisite;

    boolean duplicate;

    @Nonnull
    String description;

    String skills;

    Integer speed;

    String specialAttacks;

    public void duplicateFeatCheck(Feats feats) {
        int specialFeatInt;
        String specialFeatString;
        switch (feats.getFeatName()){
            case "Rage":
            specialFeatInt = feats.getFeatSpecial().charAt(0);
            specialFeatInt +=1;
            specialFeatString = specialFeatInt+"/day";
            feats.setFeatSpecial(specialFeatString);
            break;
            case "Trap sense":
            specialFeatInt = feats.getFeatSpecial().charAt(1);
            specialFeatInt +=1;
            specialFeatString = "+"+specialFeatInt;
            feats.setFeatSpecial(specialFeatString);
            break;
            }
        }    
}
