package ded_card.Classes;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Classes {
    
    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer classId;

    @Enumerated (EnumType.STRING)
    private ClassName className;
    private boolean prestigeClass;
    private double baseAttackBonus;
    private double fortitude;
    private double reflex;
    private double will;
    private double skillPoints;
    private boolean appraise;
    private boolean balance;
    private boolean bluff;
    private boolean climb;
    private boolean concentration;
    private boolean craft;
    private boolean diplomacy;
    private boolean disable_device;
    private boolean disguise;
    private boolean escape_artist;
    private boolean gather_information;
    private boolean handle_animal;
    private boolean heal;
    private boolean intimidate;
    private boolean jump;
    private boolean knowledge;
    private boolean listen;
    private boolean move_silently;
    private boolean perform;
    private boolean profession;
    private boolean ride;
    private boolean search;
    private boolean sense_motive;
    private boolean sleight_of_hand;
    private boolean spellcraft;
    private boolean spot;
    private boolean survival;
    private boolean swim;
    private boolean tumble;
    private boolean use_magic_device;
    private boolean use_rope;

    public ClassName getClassName() {
        return className;
    }

    public void setNameClassPg(ClassName className) {
        this.className = className;
    }

    public boolean isPrestigeClass() {
        return prestigeClass;
    }

    public void setPrestigeClass(boolean appraise) {
        this.appraise = prestigeClass;
    }

    public double getBaseAttackBonus() {
        return baseAttackBonus;
    }

    public void setBaseAttackBonus(double baseAttackBonus) {
        this.baseAttackBonus = baseAttackBonus;
    }

    public double getFortitude() {
        return fortitude;
    }

    public void setFortitude(double toughnes) {
        this.fortitude = toughnes;
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

    public double getSkillPoints() {
        return skillPoints;
    }

    public void setSkillPoints(double skillPoints) {
        this.skillPoints = skillPoints;
    }

    public boolean isAppraise() {
        return appraise;
    }

    public void setAppraise(boolean appraise) {
        this.appraise = appraise;
    }

    public boolean isBalance() {
        return balance;
    }

    public void setBalance(boolean balance) {
        this.balance = balance;
    }

    public boolean isBluff() {
        return bluff;
    }

    public void setBluff(boolean bluff) {
        this.bluff = bluff;
    }

    public boolean isClimb() {
        return climb;
    }

    public void setClimb(boolean climb) {
        this.climb = climb;
    }

    public boolean isConcentration() {
        return concentration;
    }

    public void setConcentration(boolean concentration) {
        this.concentration = concentration;
    }

    public boolean isCraft() {
        return craft;
    }

    public void setCraft(boolean craft) {
        this.craft = craft;
    }

    public boolean isDiplomacy() {
        return diplomacy;
    }

    public void setDiplomacy(boolean diplomacy) {
        this.diplomacy = diplomacy;
    }

    public boolean isDisable_device() {
        return disable_device;
    }

    public void setDisable_device(boolean disable_device) {
        this.disable_device = disable_device;
    }

    public boolean isDisguise() {
        return disguise;
    }

    public void setDisguise(boolean disguise) {
        this.disguise = disguise;
    }

    public boolean isEscape_artist() {
        return escape_artist;
    }

    public void setEscape_artist(boolean escape_artist) {
        this.escape_artist = escape_artist;
    }

    public boolean isGather_information() {
        return gather_information;
    }

    public void setGather_information(boolean gather_information) {
        this.gather_information = gather_information;
    }

    public boolean isHandle_animal() {
        return handle_animal;
    }

    public void setHandle_animal(boolean handle_animal) {
        this.handle_animal = handle_animal;
    }

    public boolean isHeal() {
        return heal;
    }

    public void setHeal(boolean heal) {
        this.heal = heal;
    }

    public boolean isIntimidate() {
        return intimidate;
    }

    public void setIntimidate(boolean intimidate) {
        this.intimidate = intimidate;
    }

    public boolean isJump() {
        return jump;
    }





    public void setJump(boolean jump) {
        this.jump = jump;
    }





    public boolean isKnowledge() {
        return knowledge;
    }





    public void setKnowledge(boolean knowledge) {
        this.knowledge = knowledge;
    }





    public boolean isListen() {
        return listen;
    }





    public void setListen(boolean listen) {
        this.listen = listen;
    }





    public boolean isMove_silently() {
        return move_silently;
    }





    public void setMove_silently(boolean move_silently) {
        this.move_silently = move_silently;
    }





    public boolean isPerform() {
        return perform;
    }





    public void setPerform(boolean perform) {
        this.perform = perform;
    }





    public boolean isProfession() {
        return profession;
    }





    public void setProfession(boolean profession) {
        this.profession = profession;
    }





    public boolean isRide() {
        return ride;
    }





    public void setRide(boolean ride) {
        this.ride = ride;
    }





    public boolean isSearch() {
        return search;
    }





    public void setSearch(boolean search) {
        this.search = search;
    }





    public boolean isSense_motive() {
        return sense_motive;
    }





    public void setSense_motive(boolean sense_motive) {
        this.sense_motive = sense_motive;
    }





    public boolean isSleight_of_hand() {
        return sleight_of_hand;
    }





    public void setSleight_of_hand(boolean sleight_of_hand) {
        this.sleight_of_hand = sleight_of_hand;
    }

    public boolean isSpellcraft() {
        return spellcraft;
    }

    public void setSpellcraft(boolean spellcraft) {
        this.spellcraft = spellcraft;
    }

    public boolean isSpot() {
        return spot;
    }

    public void setSpot(boolean spot) {
        this.spot = spot;
    }

    public boolean isSurvival() {
        return survival;
    }

    public void setSurvival(boolean survival) {
        this.survival = survival;
    }

    public boolean isSwim() {
        return swim;
    }

    public void setSwim(boolean swim) {
        this.swim = swim;
    }

    public boolean isTumble() {
        return tumble;
    }

    public void setTumble(boolean tumble) {
        this.tumble = tumble;
    }

    public boolean isUse_magic_device() {
        return use_magic_device;
    }

    public void setUse_magic_device(boolean use_magic_device) {
        this.use_magic_device = use_magic_device;
    }

    public boolean isUse_rope() {
        return use_rope;
    }

    public void setUse_rope(boolean use_rope) {
        this.use_rope = use_rope;
    }

    public Classes(ClassName className, boolean prestigeClass, double baseAttackBonus, double fortitude, double reflex, double will,
            double skillPoints, boolean appraise, boolean balance, boolean bluff, boolean climb, boolean concentration, boolean craft,
            boolean diplomacy, boolean disable_device, boolean disguise, boolean escape_artist,
            boolean gather_information, boolean handle_animal, boolean heal, boolean intimidate, boolean jump,
            boolean knowledge, boolean listen, boolean move_silently, boolean perform, boolean profession, boolean ride,
            boolean search, boolean sense_motive, boolean sleight_of_hand, boolean spellcraft, boolean spot,
            boolean survival, boolean swim, boolean tumble, boolean use_magic_device, boolean use_rope) {
        this.className = className;
        this.prestigeClass = prestigeClass;
        this.baseAttackBonus = baseAttackBonus;
        this.fortitude = fortitude;
        this.reflex = reflex;
        this.will = will;
        this.skillPoints = skillPoints;
        this.appraise = appraise;
        this.balance = balance;
        this.bluff = bluff;
        this.climb = climb;
        this.concentration = concentration;
        this.craft = craft;
        this.diplomacy = diplomacy;
        this.disable_device = disable_device;
        this.disguise = disguise;
        this.escape_artist = escape_artist;
        this.gather_information = gather_information;
        this.handle_animal = handle_animal;
        this.heal = heal;
        this.intimidate = intimidate;
        this.jump = jump;
        this.knowledge = knowledge;
        this.listen = listen;
        this.move_silently = move_silently;
        this.perform = perform;
        this.profession = profession;
        this.ride = ride;
        this.search = search;
        this.sense_motive = sense_motive;
        this.sleight_of_hand = sleight_of_hand;
        this.spellcraft = spellcraft;
        this.spot = spot;
        this.survival = survival;
        this.swim = swim;
        this.tumble = tumble;
        this.use_magic_device = use_magic_device;
        this.use_rope = use_rope;
    }

    public Classes() {
    }

}
