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
    private double baseAttackBonus;
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
        return baseAttackBonus;
    }

    public void setBaseAttackBonus1(double baseAttackBonus1) {
        this.baseAttackBonus = baseAttackBonus1;
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
