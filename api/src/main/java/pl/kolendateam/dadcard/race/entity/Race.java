package pl.kolendateam.dadcard.race.entity;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Entity;
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
import pl.kolendateam.dadcard.abilitys.entity.AbilityEnum;

@NoArgsConstructor
@Getter
@Setter
@RequiredArgsConstructor
@Entity
public class Race {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @NonNull
    String racesName;

    @NonNull
    String subRaceName;
    
    @NonNull
    String avatarUrl;

    @JdbcTypeCode(SqlTypes.JSON)
    HashMap <AbilityEnum,Integer> abilitys;

    @ManyToMany
    @JoinTable(
        name = "race_region",
        joinColumns = @JoinColumn(name = "race_id"),
        inverseJoinColumns = @JoinColumn(name = "region_id")
    )
    Set<Region> availableRegions = new HashSet<>();
}
