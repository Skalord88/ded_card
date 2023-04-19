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
import pl.kolendateam.dadcard.classCharacter.entity.ClassPc;
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
    ArrayList<ClassPc> classPcArray;

    int ecl;

    @JdbcTypeCode(SqlTypes.JSON)
    SavingThrow savingThrow;

    double bab;

    public Character(String characterName, String playerName) {
        this.characterName = characterName;
        this.playerName = playerName;
        this.classPcArray = new ArrayList<>();
        this.savingThrow = new SavingThrow();
    }

    public void addClassToPcArray(ClassPc classPc) {
        this.classPcArray.add(classPc);
    }

    public void incrementLevelClassForIndex(int index) {
        this.getClassPcArray().get(index).incrementLevel();
    }

    public void incrementEcl() {
        this.ecl += 1;
    }

    public void addSTLevelOne(ClassPc classPc) {

        String stringSavingThrow = classPc.getSavingThrow();

        double bonus;
        if (stringSavingThrow.charAt(0) == 'h') {
            bonus = 2.5;
        } else {
            bonus = 0;
        }
        this.savingThrow.setFortitude(this.savingThrow.getFortitude() + bonus);

        if (stringSavingThrow.charAt(1) == 'h') {
            bonus = 2.5;
        } else {
            bonus = 0;
        }
        this.savingThrow.setReflex(this.savingThrow.getReflex() + bonus);

        if (stringSavingThrow.charAt(2) == 'h') {
            bonus = 2.5;
        } else {
            bonus = 0;
        }
        this.savingThrow.setWill(this.savingThrow.getWill() + bonus);
    }

    public void incementST() {
        this.savingThrow.setFortitude(this.savingThrow.getFortitude() + 0.5);
        this.savingThrow.setReflex(this.savingThrow.getReflex() + 0.5);
        this.savingThrow.setWill(this.savingThrow.getWill() + 0.5);
    }

    public void incrementBab(ClassPc classPc) {
        double classBab = classPc.getClassBab();
        this.bab += classBab;
    }
}