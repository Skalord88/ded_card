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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import pl.kolendateam.dadcard.skills.entity.Skills;
import pl.kolendateam.dadcard.skills.entity.Study;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Entity
public class ClassCharacter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    short id;

    @NonNull
    @Enumerated(EnumType.STRING)
    TypeEnum type;

    @NonNull
    @Enumerated(EnumType.STRING)
    EnumClass name;
    
    @NonNull
    String avatarUrl;

    byte hitDice;

    @NonNull
    String savingThrow;

    double classBab;
    
    @ManyToMany
    @JoinTable(
        name = "class_skills",
        joinColumns = @JoinColumn(name = "class_id"),
        inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    Set<Skills> availableSkills = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "class_study",
        joinColumns = @JoinColumn(name = "class_id"),
        inverseJoinColumns = @JoinColumn(name = "study_id")
    )
    Set<Study> availableStudy = new HashSet<>();

    byte skillPoints;

    String classFeatsMap;

    String spellsPerDay;
    String spellsKnown;
}
