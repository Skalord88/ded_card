package pl.kolendateam.dadcard.characterCard.entity;

import java.util.ArrayList;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPg;
import pl.kolendateam.dadcard.classCharacter.entity.SavingThrow;


@NoArgsConstructor
@Getter
@Setter
@Entity
public class Character {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;

    @NonNull
    String characterName;

    @NonNull
    String playerName;

    @JdbcTypeCode(SqlTypes.JSON)
    ArrayList<ClassPg> classPgArray;

    int lep;

    @JdbcTypeCode(SqlTypes.JSON)
    SavingThrow savingThrow;

    public Character(String characterName, String playerName){
        this.characterName = characterName;
        this.playerName = playerName;
        this.classPgArray = new ArrayList<>();
        this.savingThrow = new SavingThrow();
    }
    
    public void addClassToPgArray(ClassPg classPg) {
        this.classPgArray.add(classPg);
    }

    public void incrementLevelClassForIndex(int index){
        this.getClassPgArray().get(index).incrementLevel();
    }

    public void incrementLep(){
        this.lep +=1;
    }

    public void addSavingThrow(String stringSavingThrow){

        SavingThrow sThrow = new SavingThrow();

        int fortitude = sThrow.calculateFortitude(stringSavingThrow);
        this.savingThrow.setFortitude(+fortitude);

        int reflex = sThrow.calculateReflex(stringSavingThrow);
        this.savingThrow.setReflex(+reflex);
        
        int will = sThrow.calculateWill(stringSavingThrow);
        this.savingThrow.setWill(+will);

    }

    public void incrementSavingThrow(){
        double sT = this.lep-1 * 0.5;
        this.savingThrow.setFortitude(+(int)sT);
        this.savingThrow.setReflex(+(int)sT);
        this.savingThrow.setWill(+(int)sT);
    }

}