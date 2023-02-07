package ded_card.Classes;

import java.util.HashSet;
import java.util.Set;

import ded_card.Skills.Skills;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

@Entity
public class ClassesPG {
    
    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

    private ClassesName classesName;
    private double baseAttackBonus1;
    private double baseAttackBonus2;
    private double baseAttackBonus3;
    private double baseAttackBonus4;
    private double baseAttackBonus5;
    private double hitDies;
    private double skillsPoint;
    private double fortitude;
    private double reflex;
    private double will;
	
    public ClassesName getClassesName() {
        return classesName;
    }

    public void setClassesName(ClassesName classesName) {
        this.classesName = classesName;
    }

    public double getBaseAttackBonus1() {
        return baseAttackBonus1;
    }

    public void setBaseAttackBonus1(double baseAttackBonus1) {
        this.baseAttackBonus1 = baseAttackBonus1;
    }

    public double getBaseAttackBonus2() {
        return baseAttackBonus2;
    }

    public void setBaseAttackBonus2(double baseAttackBonus2) {
        this.baseAttackBonus2 = baseAttackBonus2;
    }

    public double getBaseAttackBonus3() {
        return baseAttackBonus3;
    }

    public void setBaseAttackBonus3(double baseAttackBonus3) {
        this.baseAttackBonus3 = baseAttackBonus3;
    }

    public double getBaseAttackBonus4() {
        return baseAttackBonus4;
    }

    public void setBaseAttackBonus4(double baseAttackBonus4) {
        this.baseAttackBonus4 = baseAttackBonus4;
    }

    public double getBaseAttackBonus5() {
        return baseAttackBonus5;
    }

    public void setBaseAttackBonus5(double baseAttackBonus5) {
        this.baseAttackBonus5 = baseAttackBonus5;
    }

    public double getHitDies() {
        return hitDies;
    }

    public void setHitDies(double hitDies) {
        this.hitDies = hitDies;
    }

    public double getSkillsPoint() {
        return skillsPoint;
    }

    public void setSkillsPoint(double skillsPoint) {
        this.skillsPoint = skillsPoint;
    }

    public double getFortitude() {
        return fortitude;
    }

    public void setFortitude(double fortitude) {
        this.fortitude = fortitude;
    }

    public double getReflex() {
        return reflex;
    }

    public void setReflex(double reflex) {
        this.reflex = reflex;
    }

    public double getWill() {
        return will;
    }

    public void setWill(double will) {
        this.will = will;
    }

    public Set<Skills> getSkills() {
        return skills;
    }

    @ManyToMany
    private Set<Skills> skills = new HashSet<Skills>();
        
    public void setSkills(Skills skills) {
        
        this.skills.add(skills);

    }

}
