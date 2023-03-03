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
public class ListClass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;

    @NonNull
    @Column(nullable=false)
    private String className;

    @NonNull
    @Column(nullable=false)
    private String classRole;

    @NonNull
    @Column(nullable=false)
    private String classSkill;
    
}
