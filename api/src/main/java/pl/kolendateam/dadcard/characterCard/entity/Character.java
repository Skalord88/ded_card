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
import pl.kolendateam.dadcard.classCharacter.entity.ClassPg;
import pl.kolendateam.dadcard.classCharacter.entity.SavingThrow;
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
    ArrayList<ClassPg> classPgArray;

    int lep;

    @JdbcTypeCode(SqlTypes.JSON)
    SavingThrow savingThrow;

    @JdbcTypeCode(SqlTypes.JSON)
    ArrayList<ClassSkills> classSkills;

    double skillPoints;

    public Character(String characterName, String playerName){
        this.characterName = characterName;
        this.playerName = playerName;
        this.classPgArray = new ArrayList<>();
        this.savingThrow = new SavingThrow();
        this.classSkills = new ArrayList<>();
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
            this.getSavingThrow().addSTFortitude(bonus);

            if(stringSavingThrow.charAt(1) == 'h'){
                bonus = 2.5;
            } else{bonus = 0;}
            this.getSavingThrow().addSTReflex(bonus);

            if(stringSavingThrow.charAt(2) == 'h'){
                bonus = 2.5;
            } else{bonus = 0;}
            this.getSavingThrow().addSTWill(bonus);            
        }

    public void incementST() {
        this.getSavingThrow().incementSTFortitude();
        this.getSavingThrow().incementSTReflex();
        this.getSavingThrow().incementSTWill();
    }

    public void setSkillsTruePgArray(Set<Skills> availableSkills) {
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

    public void calculateSkillPointsFirstLevel(int skPoints) {
        this.skillPoints = skPoints * 3;
    }

    public void calculateSkillPoints(int skPoints) {
        this.skillPoints += skPoints;
    }

    public void buySkills(String nameSkill, int lep, int skPoints) {
        for(ClassSkills skill : classSkills){
            if(skill.getNameSkill().equals(nameSkill)){
                boolean check = true;
                if(skPoints > lep+3){
                check = false;
                }
                if(skill.isClassSkill()==true && skill.getSkillRank()>=lep+3){
                check = false;
                }
                double doubleLEP = (lep+3)/2;
                if(skill.isClassSkill()==false && skill.getSkillRank()>=(int)doubleLEP){
                check = false;
                }
                if(check == true){
                    if(skill.isClassSkill()==true){
                    skill.setSkillRank(+skPoints);
                    this.skillPoints -= skPoints;
                    }
                    if(skill.isClassSkill()==false){
                    skill.setSkillRank(+skPoints/2);
                    this.skillPoints -= skPoints;
                    }
                }
            }
        }
    }
}