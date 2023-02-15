package ded_card.mod;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ModAbilities {

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer modAbilitiesId;
    private int abilities;
    private int modAbilities;
    private int bonusSpell1;
    private int bonusSpell2;
    private int bonusSpell3;
    private int bonusSpell4;
    private int bonusSpell5;
    private int bonusSpell6;
    private int bonusSpell7;
    private int bonusSpell8;
    private int bonusSpell9;

    
    public ModAbilities() {
    }

    public ModAbilities(int abilities, int modAbilities, int bonusSpell1, int bonusSpell2, int bonusSpell3,
            int bonusSpell4, int bonusSpell5, int bonusSpell6, int bonusSpell7, int bonusSpell8, int bonusSpell9) {
        this.abilities = abilities;
        this.modAbilities = modAbilities;
        this.bonusSpell1 = bonusSpell1;
        this.bonusSpell2 = bonusSpell2;
        this.bonusSpell3 = bonusSpell3;
        this.bonusSpell4 = bonusSpell4;
        this.bonusSpell5 = bonusSpell5;
        this.bonusSpell6 = bonusSpell6;
        this.bonusSpell7 = bonusSpell7;
        this.bonusSpell8 = bonusSpell8;
        this.bonusSpell9 = bonusSpell9;
    }
    
    public int getAbilities() {
        return abilities;
    }
    public void setAbilities(int abilities) {
        this.abilities = abilities;
    }
    public int getModAbilities() {
        return modAbilities;
    }
    public void setModAbilities(int modAbilities) {
        this.modAbilities = modAbilities;
    }
    public int getBonusSpell1() {
        return bonusSpell1;
    }
    public void setBonusSpell1(int bonusSpell1) {
        this.bonusSpell1 = bonusSpell1;
    }
    public int getBonusSpell2() {
        return bonusSpell2;
    }
    public void setBonusSpell2(int bonusSpell2) {
        this.bonusSpell2 = bonusSpell2;
    }
    public int getBonusSpell3() {
        return bonusSpell3;
    }
    public void setBonusSpell3(int bonusSpell3) {
        this.bonusSpell3 = bonusSpell3;
    }
    public int getBonusSpell4() {
        return bonusSpell4;
    }
    public void setBonusSpell4(int bonusSpell4) {
        this.bonusSpell4 = bonusSpell4;
    }
    public int getBonusSpell5() {
        return bonusSpell5;
    }
    public void setBonusSpell5(int bonusSpell5) {
        this.bonusSpell5 = bonusSpell5;
    }
    public int getBonusSpell6() {
        return bonusSpell6;
    }
    public void setBonusSpell6(int bonusSpell6) {
        this.bonusSpell6 = bonusSpell6;
    }
    public int getBonusSpell7() {
        return bonusSpell7;
    }
    public void setBonusSpell7(int bonusSpell7) {
        this.bonusSpell7 = bonusSpell7;
    }
    public int getBonusSpell8() {
        return bonusSpell8;
    }
    public void setBonusSpell8(int bonusSpell8) {
        this.bonusSpell8 = bonusSpell8;
    }
    public int getBonusSpell9() {
        return bonusSpell9;
    }
    public void setBonusSpell9(int bonusSpell9) {
        this.bonusSpell9 = bonusSpell9;
    }
    
}
