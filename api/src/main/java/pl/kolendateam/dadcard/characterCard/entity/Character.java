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

    public void addSTLevelOne(ClassPg classPg){

        String stringSavingThrow = classPg.getSavingThrow();

            double bonus;
            if(stringSavingThrow.charAt(0) == 'h'){
                bonus = 2.5;
            } else{bonus = 0;}
            this.savingThrow.setFortitude(this.savingThrow.getFortitude()+bonus);

            if(stringSavingThrow.charAt(1) == 'h'){
                bonus = 2.5;
            } else{bonus = 0;}
            this.savingThrow.setReflex(this.savingThrow.getReflex()+bonus);

            if(stringSavingThrow.charAt(2) == 'h'){
                bonus = 2.5;
            } else{bonus = 0;}
            this.savingThrow.setWill(this.savingThrow.getWill()+bonus);            
        }

    public void incementST() {
        this.savingThrow.setFortitude(this.savingThrow.getFortitude()+0.5);
        this.savingThrow.setReflex(this.savingThrow.getReflex()+0.5);
        this.savingThrow.setWill(this.savingThrow.getWill()+0.5);
    }
}