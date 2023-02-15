package ded_card.Races;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Races {

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer racesId;

    @Enumerated (EnumType.STRING)
    private RacesName racesName;
    @Enumerated (EnumType.STRING)
    private SubRacesName subRacesName;
    private int strenght;
    private int dextrity;
    private int consitution;
    private int intelligence;
    private int wisdom;
    private int charisma;
    private int appraise;
    private int balance;
    private int bluff;
    private int climb;
    private int concentration;
    private int craft;
    private int decipher_script;
    private int diplomacy;
    private int disable_device;
    private int disguise;
    private int escape_artist;
    private int gather_information;
    private int handle_animal;
    private int heal;
    private int intimidate;
    private int jump;
    private int knowledge;
    private int listen;
    private int move_silently;
    private int perform;
    private int profession;
    private int ride;
    private int search;
    private int sense_motive;
    private int sleight_of_hand;
    private int speak_language;
    private int spellcraft;
    private int spot;
    private int survival;
    private int swim;
    private int tumble;
    private int use_magic_device;
    private int use_rope;



    public Races(RacesName racesName, SubRacesName subRacesName, int strenght, int dextrity, int consitution,
            int intelligence, int wisdom, int charisma, int appraise, int balance, int bluff, int climb,
            int concentration, int craft, int decipher_script, int diplomacy, int disable_device, int disguise,
            int escape_artist, int gather_information, int handle_animal, int heal, int intimidate, int jump,
            int knowledge, int listen, int move_silently, int perform, int profession, int ride, int search,
            int sense_motive, int sleight_of_hand, int speak_language, int spellcraft, int spot, int survival, int swim,
            int tumble, int use_magic_device, int use_rope) {
        this.racesName = racesName;
        this.subRacesName = subRacesName;
        this.strenght = strenght;
        this.dextrity = dextrity;
        this.consitution = consitution;
        this.intelligence = intelligence;
        this.wisdom = wisdom;
        this.charisma = charisma;
        this.appraise = appraise;
        this.balance = balance;
        this.bluff = bluff;
        this.climb = climb;
        this.concentration = concentration;
        this.craft = craft;
        this.decipher_script = decipher_script;
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
        this.speak_language = speak_language;
        this.spellcraft = spellcraft;
        this.spot = spot;
        this.survival = survival;
        this.swim = swim;
        this.tumble = tumble;
        this.use_magic_device = use_magic_device;
        this.use_rope = use_rope;
    }



    public RacesName getRacesName() {
        return racesName;
    }



    public void setRacesName(RacesName racesName) {
        this.racesName = racesName;
    }



    public SubRacesName getSubRacesName() {
        return subRacesName;
    }



    public void setSubRacesName(SubRacesName subRacesName) {
        this.subRacesName = subRacesName;
    }



    public int getStrenght() {
        return strenght;
    }



    public void setStrenght(int strenght) {
        this.strenght = strenght;
    }



    public int getDextrity() {
        return dextrity;
    }



    public void setDextrity(int dextrity) {
        this.dextrity = dextrity;
    }



    public int getConsitution() {
        return consitution;
    }



    public void setConsitution(int consitution) {
        this.consitution = consitution;
    }



    public int getIntelligence() {
        return intelligence;
    }



    public void setIntelligence(int intelligence) {
        this.intelligence = intelligence;
    }



    public int getWisdom() {
        return wisdom;
    }



    public void setWisdom(int wisdom) {
        this.wisdom = wisdom;
    }



    public int getCharisma() {
        return charisma;
    }



    public void setCharisma(int charisma) {
        this.charisma = charisma;
    }



    public int getAppraise() {
        return appraise;
    }



    public void setAppraise(int appraise) {
        this.appraise = appraise;
    }



    public int getBalance() {
        return balance;
    }



    public void setBalance(int balance) {
        this.balance = balance;
    }



    public int getBluff() {
        return bluff;
    }



    public void setBluff(int bluff) {
        this.bluff = bluff;
    }



    public int getClimb() {
        return climb;
    }



    public void setClimb(int climb) {
        this.climb = climb;
    }



    public int getConcentration() {
        return concentration;
    }



    public void setConcentration(int concentration) {
        this.concentration = concentration;
    }



    public int getCraft() {
        return craft;
    }



    public void setCraft(int craft) {
        this.craft = craft;
    }



    public int getDecipher_script() {
        return decipher_script;
    }



    public void setDecipher_script(int decipher_script) {
        this.decipher_script = decipher_script;
    }



    public int getDiplomacy() {
        return diplomacy;
    }



    public void setDiplomacy(int diplomacy) {
        this.diplomacy = diplomacy;
    }



    public int getDisable_device() {
        return disable_device;
    }



    public void setDisable_device(int disable_device) {
        this.disable_device = disable_device;
    }



    public int getDisguise() {
        return disguise;
    }



    public void setDisguise(int disguise) {
        this.disguise = disguise;
    }



    public int getEscape_artist() {
        return escape_artist;
    }



    public void setEscape_artist(int escape_artist) {
        this.escape_artist = escape_artist;
    }



    public int getGather_information() {
        return gather_information;
    }



    public void setGather_information(int gather_information) {
        this.gather_information = gather_information;
    }



    public int getHandle_animal() {
        return handle_animal;
    }



    public void setHandle_animal(int handle_animal) {
        this.handle_animal = handle_animal;
    }



    public int getHeal() {
        return heal;
    }



    public void setHeal(int heal) {
        this.heal = heal;
    }



    public int getIntimidate() {
        return intimidate;
    }



    public void setIntimidate(int intimidate) {
        this.intimidate = intimidate;
    }



    public int getJump() {
        return jump;
    }



    public void setJump(int jump) {
        this.jump = jump;
    }



    public int getKnowledge() {
        return knowledge;
    }



    public void setKnowledge(int knowledge) {
        this.knowledge = knowledge;
    }



    public int getListen() {
        return listen;
    }



    public void setListen(int listen) {
        this.listen = listen;
    }



    public int getMove_silently() {
        return move_silently;
    }



    public void setMove_silently(int move_silently) {
        this.move_silently = move_silently;
    }



    public int getPerform() {
        return perform;
    }



    public void setPerform(int perform) {
        this.perform = perform;
    }



    public int getProfession() {
        return profession;
    }



    public void setProfession(int profession) {
        this.profession = profession;
    }



    public int getRide() {
        return ride;
    }



    public void setRide(int ride) {
        this.ride = ride;
    }



    public int getSearch() {
        return search;
    }



    public void setSearch(int search) {
        this.search = search;
    }



    public int getSense_motive() {
        return sense_motive;
    }



    public void setSense_motive(int sense_motive) {
        this.sense_motive = sense_motive;
    }



    public int getSleight_of_hand() {
        return sleight_of_hand;
    }



    public void setSleight_of_hand(int sleight_of_hand) {
        this.sleight_of_hand = sleight_of_hand;
    }



    public int getSpeak_language() {
        return speak_language;
    }



    public void setSpeak_language(int speak_language) {
        this.speak_language = speak_language;
    }



    public int getSpellcraft() {
        return spellcraft;
    }



    public void setSpellcraft(int spellcraft) {
        this.spellcraft = spellcraft;
    }



    public int getSpot() {
        return spot;
    }



    public void setSpot(int spot) {
        this.spot = spot;
    }



    public int getSurvival() {
        return survival;
    }



    public void setSurvival(int survival) {
        this.survival = survival;
    }



    public int getSwim() {
        return swim;
    }



    public void setSwim(int swim) {
        this.swim = swim;
    }



    public int getTumble() {
        return tumble;
    }



    public void setTumble(int tumble) {
        this.tumble = tumble;
    }



    public int getUse_magic_device() {
        return use_magic_device;
    }



    public void setUse_magic_device(int use_magic_device) {
        this.use_magic_device = use_magic_device;
    }



    public int getUse_rope() {
        return use_rope;
    }



    public void setUse_rope(int use_rope) {
        this.use_rope = use_rope;
    }



    public Races() {
    }


}
