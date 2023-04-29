package pl.kolendateam.dadcard.characterCard.entity;

import java.util.ArrayList;
import java.util.HashMap;
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
import pl.kolendateam.dadcard.abilitys.entity.AbilityEnum;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
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
    Vitality vitality;

    @JdbcTypeCode(SqlTypes.JSON)
    SavingThrow savingThrow;

    @JdbcTypeCode(SqlTypes.JSON)
    ArrayList<ClassSkills> classSkills;

    double skillPoints;
    
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

    public void setSkillsTruePcArray(Set<Skills> availableSkills) {
        for(Skills skill : availableSkills){
            for(ClassSkills classSkill : classSkills){
                if(skill.getId() == classSkill.getIdSkill()){
                    classSkill.setClassSkill(true);
                }
            }
        }
    }

    public void setSkillsTruecgArray(Set<Skills> availableSkills) {
        for(Skills skill : availableSkills){
            for(ClassSkills classSkill : classSkills){
                if(skill.getId() == classSkill.getIdSkill()){
                    classSkill.setClassSkill(true);
                }
            }
        }
    }

    public void createSkillsArray(List<Skills> skillsList) {
        boolean check = true;
        if(classSkills.isEmpty()){
            check = false;
        }
        if(check == false){
        for(int x = 0; x < skillsList.size(); x++){

            ClassSkills skill = new ClassSkills();
                skill.setIdSkill(skillsList.get(x).getId());
                skill.setNameSkill(skillsList.get(x).getName());
                skill.setClassSkill(false);
                AbilityEnum ability = skillsList.get(x).getAbility();
                switch (ability) {
                    case STRENGHT:
                    skill.setSkillRank(skill.getSkillRank()+abilitys.getStreghtBonus());
                    break;
                    case DEXTRITY:
                    skill.setSkillRank(skill.getSkillRank()+abilitys.getDextrityBonus());
                    break;
                    case CONSTITUTION:
                    skill.setSkillRank(skill.getSkillRank()+abilitys.getConstitutionBonus());
                    break;
                    case INTELLIGENCE:
                    skill.setSkillRank(skill.getSkillRank()+abilitys.getIntelligenceBonus());
                    break;
                    case WISDOM:
                    skill.setSkillRank(skill.getSkillRank()+abilitys.getWisdomBonus());
                    break;
                    case CHARISMA:
                    skill.setSkillRank(skill.getSkillRank()+abilitys.getCharismaBonus());
                    break;
                }
                this.classSkills.add(skill);
            }
        }
    }

    public void calculateSkillPointsFirstLevel(int skPoints) {
        this.skillPoints = (skPoints+abilitys.getIntelligenceBonus()) * 3;
    }

    public void calculateSkillPoints(int skPoints) {
        this.skillPoints += abilitys.getIntelligenceBonus()+skPoints;
    }

    public void buySkills(int idSkill, int skPoints) {
        for(ClassSkills skill : classSkills){
            if(skill.getIdSkill() == idSkill){
                boolean check = true;
                if(skillPoints < 1){
                    check = false;
                }
                if(skPoints > this.ecl+3){
                    check = false;
                }
                if(skill.isClassSkill()==true && skill.getSkillRank()>=this.ecl+3){
                    check = false;
                }
                double doubleLEP = (this.ecl+3)/2;
                if(skill.isClassSkill()==false && skill.getSkillRank()>=(int)doubleLEP){
                    check = false;
                }
                if(check == true){
                    if(skill.isClassSkill()==true){
                    skill.setSkillRank(skill.getSkillRank()+skPoints);
                    this.skillPoints -= skPoints;
                    }
                    if(skill.isClassSkill()==false){
                    skill.setSkillRank(skill.getSkillRank()+skPoints/2);
                    this.skillPoints -= skPoints;
                    }
                }
            }
        }
    }
    
    public void incrementBab(double classBab) {
        this.bab += classBab;
    }

    public void hitPointsFirstLevel(int hitDice) {
        Vitality vita = new Vitality();

        vita.setLife(this.abilitys.getConstitution());
        HashMap <Integer,Integer> vitaMap = new HashMap<Integer,Integer>();
        vitaMap.put(hitDice, 1);
        vita.setHitDices(vitaMap);
        vita.setHitPoints(hitDice+this.abilitys.getConstitutionBonus());

        this.vitality = vita;
    }

    public void hitPointsNewLevel(int hitDice) {

        vitality.hitDices.put(hitDice, vitality.hitDices.get(hitDice) + 1);

        if(ecl % 2 == 0){
            this.vitality.setHitPoints(this.vitality.getHitPoints()+hitDice/2);
        } else {
            this.vitality.setHitPoints(this.vitality.getHitPoints()+hitDice/2+1);
        }
    }
}
