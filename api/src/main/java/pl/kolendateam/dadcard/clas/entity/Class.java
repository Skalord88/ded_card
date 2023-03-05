package pl.kolendateam.dadcard.clas.entity;

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
@RequiredArgsConstructor
@Entity
public class Class {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @NonNull
    private String classType;

    @NonNull
    private String className;
    
    @NonNull
    private String avatarClassUrl;

}
