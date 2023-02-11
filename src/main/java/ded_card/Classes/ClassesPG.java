package ded_card.Classes;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ClassesPG {
    
    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer classPgId;

    private ClassesName nameClassPg;
    private double baseAttackBonus;

    public ClassesName getNameClassPg() {
        return nameClassPg;
    }

    public void setNameClassPg(ClassesName nameClassPg) {
        this.nameClassPg = nameClassPg;
    }
    
    public Integer getClassPgId() {
        return classPgId;
    }

    public void setClassPgId(Integer classPgId) {
        this.classPgId = classPgId;
    }

    public double getBaseAttackBonus() {
        return baseAttackBonus;
    }

    public void setBaseAttackBonus(double baseAttackBonus) {
        this.baseAttackBonus = baseAttackBonus;
    }

    public ClassesPG() {
    }

}
