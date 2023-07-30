package pl.kolendateam.items.weapons.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import pl.kolendateam.items.entity.Items;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Weapons extends Items {



    @NonNull
    @Enumerated(EnumType.STRING)
    WeaponNameEnum weaponName;

    @NonNull
    @Enumerated(EnumType.STRING)
    WeaponNumericEnum damage;

    @NonNull
    @Enumerated(EnumType.STRING)
    WeaponNumericEnum critical;

    Integer range;

    @NonNull
    String type;

    String specialAttacks;
    
}

// @MappedSuperClass
// public abstract class AbstractAnswer{
//     @Id
//     protected Long idAnswer;

//     @Column(name="answerContent")
//     protected String answerContent;
// }

// @Entity
// @Table(name="Answer")
// public class Answer extends AbstractAnswer{

// }

// @Entity
// @Table(name="MatchAnswer")
// public class MatchAnswer extends AbstractAnswer{
//     protected String matchingAnswer;
// }

// @Entity
// @Table(name="TrueFalseAnswer")
// public class TrueFalseAnswer extends AbstractAnswer{
//     protected Boolean trueFalseAnswer;
// }