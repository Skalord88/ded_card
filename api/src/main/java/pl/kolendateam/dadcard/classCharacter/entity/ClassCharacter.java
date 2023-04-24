package pl.kolendateam.dadcard.classCharacter.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.skills.entity.Skills;

@NoArgsConstructor
@Getter
@Setter
@RequiredArgsConstructor
@Entity
public class ClassCharacter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @NonNull
    @Enumerated(EnumType.STRING)
    TypeEnum type;

    @NonNull
    String name;
    
    @NonNull
    String avatarUrl;

    @NonNull
    String savingThrow;

    @NonNull
    double classBab;
    
    @ManyToMany
    @JoinTable(
        name = "class_skills",
        joinColumns = @JoinColumn(name = "class_id"),
        inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    Set<Skills> availableSkills = new HashSet<>();

    @NonNull
    int skillPoints;

}
