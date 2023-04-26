package pl.kolendateam.dadcard.skills.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity

public class Skills {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Nonnull
    String name;

    @ManyToMany
    @JoinTable(
        name = "skill_ability",
        joinColumns = @JoinColumn(name = "skill_id"),
        inverseJoinColumns = @JoinColumn(name = "ability_name_id")
    )
    Set<Skills> attributeOfSkills = new HashSet<>();
    
}
