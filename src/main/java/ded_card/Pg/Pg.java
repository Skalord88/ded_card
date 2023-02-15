package ded_card.Pg;

import ded_card.Races.RacesName;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Pg {

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer pgId;

    @Enumerated (EnumType.STRING)
    private PgRacesName pgRacesName;
    @Enumerated (EnumType.STRING)
    private PgSubRacesName pgSubRacesName;
    private int pgStrenght;
    private int pgModStrenght;
    private int pgDextrity;
    private int pgModDextrity;
    private int pgConsitution;
    private int pgModConsitution;
    private int pgIntelligence;
    private int pgModIntelligence;
    private int pgWisdom;
    private int pgModWisdom;
    private int pgCharisma;
    private int pgModCharisma;
    private int pgBaseAttackBonus;
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

   

    public Pg(PgRacesName pgRacesName, PgSubRacesName pgSubRacesName, int pgStrenght, int pgModStrenght,
            int pgDextrity, int pgModDextrity, int pgConsitution, int pgModConsitution, int pgIntelligence,
            int pgModIntelligence, int pgWisdom, int pgModWisdom, int pgCharisma, int pgModCharisma,
            int pgBaseAttackBonus, boolean appraise, boolean balance, boolean bluff, boolean climb,
            boolean concentration, boolean craft, boolean diplomacy, boolean disable_device,
            boolean disguise, boolean escape_artist, boolean gather_information, boolean handle_animal, boolean heal,
            boolean intimidate, boolean jump, boolean knowledge, boolean listen, boolean move_silently, boolean perform,
            boolean profession, boolean ride, boolean search, boolean sense_motive, boolean sleight_of_hand,
            boolean spellcraft, boolean spot, boolean survival, boolean swim, boolean tumble, boolean use_magic_device,
            boolean use_rope) {
        this.pgRacesName = pgRacesName;
        this.pgSubRacesName = pgSubRacesName;
        this.pgStrenght = pgStrenght;
        this.pgModStrenght = pgModStrenght;
        this.pgDextrity = pgDextrity;
        this.pgModDextrity = pgModDextrity;
        this.pgConsitution = pgConsitution;
        this.pgModConsitution = pgModConsitution;
        this.pgIntelligence = pgIntelligence;
        this.pgModIntelligence = pgModIntelligence;
        this.pgWisdom = pgWisdom;
        this.pgModWisdom = pgModWisdom;
        this.pgCharisma = pgCharisma;
        this.pgModCharisma = pgModCharisma;
        this.pgBaseAttackBonus = pgBaseAttackBonus;
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





    public PgRacesName getPgRacesName() {
        return pgRacesName;
    }





    public void setPgRacesName(PgRacesName pgRacesName) {
        this.pgRacesName = pgRacesName;
    }





    public PgSubRacesName getPgSubRacesName() {
        return pgSubRacesName;
    }





    public void setPgSubRacesName(PgSubRacesName pgSubRacesName) {
        this.pgSubRacesName = pgSubRacesName;
    }





    public int getPgStrenght() {
        return pgStrenght;
    }





    public void setPgStrenght(int pgStrenght) {
        this.pgStrenght = pgStrenght;
    }





    public int getPgModStrenght() {
        return pgModStrenght;
    }





    public void setPgModStrenght(int pgModStrenght) {
        this.pgModStrenght = pgModStrenght;
    }





    public int getPgDextrity() {
        return pgDextrity;
    }





    public void setPgDextrity(int pgDextrity) {
        this.pgDextrity = pgDextrity;
    }





    public int getPgModDextrity() {
        return pgModDextrity;
    }





    public void setPgModDextrity(int pgModDextrity) {
        this.pgModDextrity = pgModDextrity;
    }





    public int getPgConsitution() {
        return pgConsitution;
    }





    public void setPgConsitution(int pgConsitution) {
        this.pgConsitution = pgConsitution;
    }





    public int getPgModConsitution() {
        return pgModConsitution;
    }





    public void setPgModConsitution(int pgModConsitution) {
        this.pgModConsitution = pgModConsitution;
    }





    public int getPgIntelligence() {
        return pgIntelligence;
    }





    public void setPgIntelligence(int pgIntelligence) {
        this.pgIntelligence = pgIntelligence;
    }





    public int getPgModIntelligence() {
        return pgModIntelligence;
    }





    public void setPgModIntelligence(int pgModpgIntelligence) {
        this.pgModIntelligence = pgModpgIntelligence;
    }





    public int getPgWisdom() {
        return pgWisdom;
    }

    public void setPgWisdom(int pgWisdom) {
        this.pgWisdom = pgWisdom;
    }





    public int getPgModWisdom() {
        return pgModWisdom;
    }





    public void setPgModWisdom(int pgModWisdom) {
        this.pgModWisdom = pgModWisdom;
    }

    public int getPgCharisma() {
        return pgCharisma;
    }

    public void setPgCharisma(int pgCharisma) {
        this.pgCharisma = pgCharisma;
    }

    public int getPgModCharisma() {
        return pgModCharisma;
    }

    public void setPgModCharisma(int pgModCharisma) {
        this.pgModCharisma = pgModCharisma;
    }

    public int getPgBaseAttackBonus() {
        return pgBaseAttackBonus;
    }

    public void setPgBaseAttackBonus(int pgBaseAttackBonus) {
        this.pgBaseAttackBonus = pgBaseAttackBonus;
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





    public Pg() {
    }





    public void setPgRacesName(RacesName racesName) {
	}

}
