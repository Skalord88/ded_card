package pl.kolendateam.dadcard.characterCard.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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
import pl.kolendateam.dadcard.classCharacter.entity.ValueEnum;
import pl.kolendateam.dadcard.skills.entity.ClassSkills;
import pl.kolendateam.dadcard.skills.entity.Skills;

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

    @JdbcTypeCode(SqlTypes.JSON)
    ArrayList<ClassSkills> classSkills;

    @JdbcTypeCode(SqlTypes.JSON)
    private Abilitys abilitys;

    double bab;

    public Character(String characterName, String playerName){
        this.characterName = characterName;
        this.playerName = playerName;
        this.classPcArray = new ArrayList<>();
        this.savingThrow = new SavingThrow();
        this.classSkills = new ArrayList<>();
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

    public void addSavingThrowLevelOne(ClassPc classPc){

        String stringSavingThrow = classPc.getSavingThrow();
    
            double bonusFortitude;
            if(stringSavingThrow.charAt(0) == ValueEnum.HIGH.getValueEnum().charAt(0)){
                bonusFortitude = 2.5;
            } else{bonusFortitude = 0;}
            this.savingThrow.setFortitude(this.savingThrow.getFortitude()+bonusFortitude);
    
            double bonusReflex;
            if(stringSavingThrow.charAt(1) == ValueEnum.HIGH.getValueEnum().charAt(0)){
                bonusReflex = 2.5;
            } else{bonusReflex = 0;}
            this.savingThrow.setReflex(this.savingThrow.getReflex()+bonusReflex);
    
            double bonusWill;
            if(stringSavingThrow.charAt(2) == ValueEnum.HIGH.getValueEnum().charAt(0)){
                bonusWill = 2.5;
            } else{bonusWill = 0;}
            this.savingThrow.setWill(this.savingThrow.getWill()+bonusWill);            
    }

    public void incementSavingThrow() {
        this.savingThrow.setFortitude(this.savingThrow.getFortitude() + 0.5);
        this.savingThrow.setReflex(this.savingThrow.getReflex() + 0.5);
        this.savingThrow.setWill(this.savingThrow.getWill() + 0.5);
    }

    public void setSkillsTruecgArray(Set<Skills> availableSkills) {
        for(Skills skill : availableSkills){
            for(ClassSkills classSkill : classSkills){
                if(skill.getName().equals(classSkill.getNameSkill())){
                    classSkill.setClassSkill(true);
                }
            }
        }
    }

    public void createSkillsArray(List<Skills> skillsList) {

        for(int x = 0; x < skillsList.size(); x++){

            ClassSkills skill = new ClassSkills();
            skill.setNameSkill(skillsList.get(x).getName());
            skill.setClassSkill(false);
            skill.setSkillRank(0);
            
            this.classSkills.add(skill);
        }
    }
    
    public void incrementBab(double classBab) {
        this.bab += classBab;
    }
}
