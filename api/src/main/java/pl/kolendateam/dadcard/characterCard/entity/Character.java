package pl.kolendateam.dadcard.characterCard.entity;

import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import pl.kolendateam.dadcard.abilitys.entity.AbilityEnum;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.armorClass.entity.ArmorClass;
import pl.kolendateam.dadcard.attack.entity.SpecialAttacks;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPc;
import pl.kolendateam.dadcard.classCharacter.entity.SavingThrow;
import pl.kolendateam.dadcard.classCharacter.entity.ValueEnum;
import pl.kolendateam.dadcard.feats.entity.ClassFeats;
import pl.kolendateam.dadcard.feats.entity.Feats;
import pl.kolendateam.dadcard.race.entity.Race;
import pl.kolendateam.dadcard.size.entity.Size;
import pl.kolendateam.dadcard.size.entity.SizeEnum;
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

    String race;
    String subRace;

    @JdbcTypeCode(SqlTypes.JSON)
    Size size;
    
    int speed;

    @JdbcTypeCode(SqlTypes.JSON)
    ArrayList<ClassPc> classPcArray;

    int ecl;
    int levelAdjustment;

    @JdbcTypeCode(SqlTypes.JSON)
    Vitality vitality;

    @JdbcTypeCode(SqlTypes.JSON)
    SavingThrow savingThrow;

    @JdbcTypeCode(SqlTypes.JSON)
    ArmorClass armorClass;

    @JdbcTypeCode(SqlTypes.JSON)
    ArrayList<ClassSkills> classSkills;

    double skillPoints;
    
    @JdbcTypeCode(SqlTypes.JSON)
    Abilitys abilitys;

    @JdbcTypeCode(SqlTypes.JSON)
    SpecialAttacks specialAttacks;

    double bab;

    @JdbcTypeCode(SqlTypes.JSON)
    ArrayList<Feats> featsList;

    public Character(String characterName, String playerName){
        this.characterName = characterName;
        this.playerName = playerName;
        this.classPcArray = new ArrayList<>();
        this.vitality = new Vitality();
        this.savingThrow = new SavingThrow();
        this.classSkills = new ArrayList<>();
        this.featsList = new ArrayList<>();
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
                skill.setSkillRank(0);
                AbilityEnum ability = skillsList.get(x).getAbility();
                switch (ability) {
                    case STRENGHT:
                    skill.setSkillAbility(ability);
                    break;
                    case DEXTRITY:
                    skill.setSkillAbility(ability);
                    break;
                    case CONSTITUTION:
                    skill.setSkillAbility(ability);
                    break;
                    case INTELLIGENCE:
                    skill.setSkillAbility(ability);
                    break;
                    case WISDOM:
                    skill.setSkillAbility(ability);
                    break;
                    case CHARISMA:
                    skill.setSkillAbility(ability);
                    break;
                }
                this.classSkills.add(skill);
            }
        }
    }

    public void calculateSkillPointsFirstLevel(int skPoints) {
        this.skillPoints += (skPoints+abilitys.bonusIntelligence(abilitys)) * 4;
    }

    public void calculateSkillPoints(int skPoints) {
        this.skillPoints += skPoints+abilitys.bonusIntelligence(abilitys);
    }

    public void buySkills(int idSkill){
        for(ClassSkills s : classSkills){
            if(s.getIdSkill() == idSkill){
                boolean check = true;
                if(s.isClassSkill() && s.getSkillRank()>=ecl+3){
                    check = false;
                }
                if(!s.isClassSkill() && s.getSkillRank()>=((ecl+3)/2)){
                    check = false;
                }
                if(check){
                    if(s.isClassSkill()){
                        s.addSkillRank();
                    } else {
                        s.addSkillRankFalse();
                    }
                    skillPoints--;
                }
            }
        }
    }

    public void sellSkills(int idSkill){
        for(ClassSkills s : classSkills){
            if(s.getIdSkill() == idSkill){
                boolean check = true;
                if(s.isClassSkill() && 0 > s.getSkillRank()-1){
                    check = false;
                }
                if(!s.isClassSkill() && 0 > s.getSkillRank()-0.5){
                    check = false;
                }
                if(check){
                    if(s.isClassSkill()){
                        s.minusSkillRank();
                    } else {
                        s.minusSkillRankFalse();
                    }
                    skillPoints++;
                }
            }
        }
    }
    
    public void incrementBab(double classBab) {
        this.bab += classBab;
    }

    public void raceLevelAdjustment(int lvAdj) {
        this.bab = (lvAdj*0.5)-0.5;
        this.levelAdjustment = lvAdj;
        this.vitality = vitality.setRaceLevelAdjustmentHP(lvAdj,vitality,abilitys);
        this.skillPoints = lvAdj*2;
    }

    public void hitPointsFirstLevel(int hitDice) {

        Vitality hP = vitality.createHPFirstLevel(hitDice,abilitys,vitality);
        this.vitality = hP;
        
    }

    public void hitPointsNewLevel(int hitDice) {

        Integer hD = vitality.hitDices.get(hitDice);

        if(hD==null){
            hD=1;
        } else{
            hD++;
        }
            
        this.vitality.hitDices.put(hitDice, hD);

        int hP = vitality.hitPointsNewtLevel(hitDice,vitality,abilitys,ecl);

        this.vitality.setHitPoints(+hP);

    }

    public void setCharacterRace(Race race) {
        this.race = race.getRacesName();
        this.subRace = race.getSubRaceName();
    }

    public void addSkill(String skills) {

        Gson gson = new Gson();

        Type listSkill = new TypeToken<List<ClassSkills>>(){}.getType();
        List<ClassSkills> skill = gson.fromJson(skills, listSkill);
        
        for(ClassSkills clSk : classSkills){
            for(ClassSkills sk : skill){
                if(clSk.getNameSkill().equals(sk.getNameSkill())){
                    clSk.setSkillDifferentBonus(clSk.getSkillDifferentBonus()+(int)sk.getSkillRank());
                }
            }
        }
    }

    public void addSpecialAttacks(String specialAttacksFeat){

        Gson gson = new Gson();
        SpecialAttacks spAtt = gson.fromJson(specialAttacksFeat, SpecialAttacks.class);

        this.specialAttacks.addSpecialAttackFeat(spAtt,this.specialAttacks);
        
    }

    public void addAbilityRace(String raceAbilitys) {

        Gson gson = new Gson();
        Abilitys jsonObjectAbilitys = gson.fromJson(raceAbilitys, Abilitys.class);

        this.abilitys.addRaceAbilitys(jsonObjectAbilitys,abilitys);
        
    }

    public void createArmorClass() {
        this.armorClass = new ArmorClass();
    }

    public void raceBonusArmorClass(String armorClass) {

        Gson gson = new Gson();
        ArmorClass jsonObjectArmorClass = gson.fromJson(armorClass, ArmorClass.class);

        this.armorClass.setNaturalArmor(jsonObjectArmorClass.getNaturalArmor());
    }

    public void setFeat(Feats feat) {

        this.featsList.add(feat);
    }

    public void addFeats(int lv, List <Feats> featsList, String classFeatsMap) {

        Gson gson = new Gson();
        Type listFeats = new TypeToken<List<ClassFeats>>(){}.getType();
        List<ClassFeats> featsJson = gson.fromJson(classFeatsMap, listFeats);

        for(ClassFeats fJ : featsJson){
            if(fJ.getLevel()==lv){
                for(Feats fL : featsList){
                    HashSet <String> fList = fJ.getClassFeats();
                    for(String f : fList){
                        if(fL.getFeatName().equals(f)){
                            if(fL.getSpeed()!=null){
                                this.speed+=fL.getSpeed();
                            }
                            this.featsList.add(fL);
                        }
                    }
                }
            }
        }    
    }

    public void addSpeed(int speed) {
        this.speed+=speed;
    }

    public void sizeCharacter(SizeEnum size) {
        Size sizeNew = new Size();
        sizeNew.sizeBonus(size);
        this.size = sizeNew;
        this.armorClass.setSizeBonus(sizeNew.getBonusAttackAc());
        for(ClassSkills skill : classSkills){
            if(skill.getNameSkill().equals("hide")){
                skill.setSkillDifferentBonus(+sizeNew.getHide());
            }
        }
    }

    public SizeEnum sizeCharacter(){
        return this.size.getSize();
    }
    
}
