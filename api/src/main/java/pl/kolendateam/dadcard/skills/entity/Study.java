package pl.kolendateam.dadcard.skills.entity;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Study implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public short id;

    @NonNull
    String studyName;

    @NonNull
    short idSkill;

}
