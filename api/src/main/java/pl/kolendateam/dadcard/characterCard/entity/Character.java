package pl.kolendateam.dadcard.characterCard.entity;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import pl.kolendateam.dadcard.abilitys.entity.AbilityEnum;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.armorClass.entity.ArmorClass;
import pl.kolendateam.dadcard.attack.entity.SpecialAttacks;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPc;
import pl.kolendateam.dadcard.classCharacter.entity.EnumClass;
import pl.kolendateam.dadcard.classCharacter.entity.SavingThrow;
import pl.kolendateam.dadcard.classCharacter.entity.ValueEnum;
import pl.kolendateam.dadcard.feats.entity.CharacterFeat;
import pl.kolendateam.dadcard.feats.entity.ClassFeats;
import pl.kolendateam.dadcard.feats.entity.Feats;
import pl.kolendateam.dadcard.feats.entity.FeatsTypeEnum;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.race.entity.Race;
import pl.kolendateam.dadcard.size.entity.Size;
import pl.kolendateam.dadcard.size.entity.SizeEnum;
import pl.kolendateam.dadcard.skills.entity.ClassSkills;
import pl.kolendateam.dadcard.skills.entity.Skills;
import pl.kolendateam.dadcard.skills.entity.Study;
import pl.kolendateam.dadcard.spells.MapperSpellsInLevel;
import pl.kolendateam.dadcard.spells.entity.Spells;
import pl.kolendateam.dadcard.spells.entity.SpellsEnum;
import pl.kolendateam.dadcard.spells.entity.SpellsInCharLevel;
import pl.kolendateam.dadcard.spells.entity.SpellsInLevel;
import pl.kolendateam.dadcard.spells.entity.SpellsTable;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Character {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public short id;

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

    short effectiveCharacterLv;
    byte levelAdjustment;

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
    ArrayList<CharacterFeat> featsList;

    @JdbcTypeCode(SqlTypes.JSON)
    ArrayList<Items> items;

    @JdbcTypeCode(SqlTypes.JSON)
    HashMap<EnumClass, Integer[]> magicPerDay;

    @JdbcTypeCode(SqlTypes.JSON)
    HashMap<EnumClass, Integer[]> magicKnown;

    @JdbcTypeCode(SqlTypes.JSON)
    ArrayList<SpellsInCharLevel> spellsKnown;

    public Character(String characterName, String playerName) {
        this.characterName = characterName;
        this.playerName = playerName;
        this.classPcArray = new ArrayList<>();
        this.vitality = new Vitality();
        this.savingThrow = new SavingThrow();
        this.classSkills = new ArrayList<>();
        this.featsList = new ArrayList<>();
        this.items = new ArrayList<>();
        this.magicPerDay = new HashMap<>();
        this.magicKnown = new HashMap<>();
        this.spellsKnown = new ArrayList<>();
    }

    public void addClassToPcArray(ClassPc classPc) {
        this.classPcArray.add(classPc);
    }

    public void removeClassFromPcArray(int index) {
        this.getClassPcArray().remove(index);
    }

    public void incrementLevelClassForIndex(int index) {
        this.getClassPcArray().get(index).incrementLevel();
    }

    public void decrementLevelClassForIndex(int index) {
        this.getClassPcArray().get(index).decrementLevel();
    }

    public void incrementEffectiveCharacterLv() {
        this.effectiveCharacterLv += 1;
    }

    public void decrementEffectiveCharacterLv() {
        this.effectiveCharacterLv -= 1;
    }

    public void addSavingThrowLevelOne(String stringSavingThrow) {

        double bonus = stringSavingThrow.charAt(0) == ValueEnum.HIGH.getValueEnum().charAt(0) ? 2.5 : 0;
        this.savingThrow.setFortitude(this.savingThrow.getFortitude() + bonus);

        bonus = stringSavingThrow.charAt(1) == ValueEnum.HIGH.getValueEnum().charAt(0) ? 2.5 : 0;
        this.savingThrow.setReflex(this.savingThrow.getReflex() + bonus);

        bonus = stringSavingThrow.charAt(2) == ValueEnum.HIGH.getValueEnum().charAt(0) ? 2.5 : 0;
        this.savingThrow.setWill(this.savingThrow.getWill() + bonus);
    }

    public void minusSavingThrowLevelOne(String stringSavingThrow) {

        double bonus = stringSavingThrow.charAt(0) == ValueEnum.HIGH.getValueEnum().charAt(0) ? 2.5 : 0;
        this.savingThrow.setFortitude(this.savingThrow.getFortitude() - bonus);

        bonus = stringSavingThrow.charAt(1) == ValueEnum.HIGH.getValueEnum().charAt(0) ? 2.5 : 0;
        this.savingThrow.setReflex(this.savingThrow.getReflex() - bonus);

        bonus = stringSavingThrow.charAt(2) == ValueEnum.HIGH.getValueEnum().charAt(0) ? 2.5 : 0;
        this.savingThrow.setWill(this.savingThrow.getWill() - bonus);
    }

    public void incementSavingThrow() {
        this.savingThrow.setFortitude(this.savingThrow.getFortitude() + 0.5);
        this.savingThrow.setReflex(this.savingThrow.getReflex() + 0.5);
        this.savingThrow.setWill(this.savingThrow.getWill() + 0.5);
    }

    public void decementSavingThrow() {
        this.savingThrow.setFortitude(this.savingThrow.getFortitude() - 0.5);
        this.savingThrow.setReflex(this.savingThrow.getReflex() - 0.5);
        this.savingThrow.setWill(this.savingThrow.getWill() - 0.5);
    }

    public void setSkillsTruePcArray(Set<Skills> availableSkills) {
        for (Skills skill : availableSkills) {
            for (ClassSkills classSkill : classSkills) {
                if (skill.getId() == classSkill.getIdSkill()) {
                    classSkill.setClassSkill(true);
                }
            }
        }
    }

    public void createSkillsArray(List<Skills> skillsList) {
        boolean check = true;
        if (classSkills.isEmpty()) {
            check = false;
        }
        if (check == false) {
            for (Skills skillDB : skillsList) {

                ClassSkills skill = new ClassSkills();

                skill.setIdSkill(skillDB.getId());
                skill.setNameSkill(skillDB.getName());
                HashMap<String, Integer> studyField = new HashMap<>();
                skill.setFieldOfStudy(studyField);
                skill.setClassSkill(false);
                skill.setSkillRank(0);
                AbilityEnum ability = skillDB.getAbility();
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
        this.skillPoints += (skPoints + abilitys.bonusIntelligence(abilitys)) * 4;
    }

    public void calculateSkillPoints(int skPoints) {
        this.skillPoints += skPoints + abilitys.bonusIntelligence(abilitys);
    }

    public void decalculateSkillPoints(int skPoints) {
        this.skillPoints -= skPoints + abilitys.bonusIntelligence(abilitys);
    }

    public void buySkills(int idSkill, double skPoints) {
        for (ClassSkills skill : classSkills) {
            if (skill.getIdSkill() == idSkill) {
                boolean check = true;
                if (skillPoints < 1) {
                    check = false;
                }
                if ((int) skPoints > this.effectiveCharacterLv + 3) {
                    check = false;
                }
                if (skill.isClassSkill() == true
                        && skill.getSkillRank() >= this.effectiveCharacterLv + 3) {
                    check = false;
                }
                double doubleLEP = (this.effectiveCharacterLv + 3) / 2;
                if (skill.isClassSkill() == false && skill.getSkillRank() >= (int) doubleLEP) {
                    check = false;
                }
                if (check == true) {
                    if (skill.isClassSkill() == true) {
                        skill.setSkillRank(skill.getSkillRank() + skPoints);
                        this.skillPoints -= skPoints;
                    }
                    if (skill.isClassSkill() == false) {
                        skill.setSkillRank(skill.getSkillRank() + skPoints / 2);
                        this.skillPoints -= skPoints;
                    }
                }
            }
        }
    }

    public void incrementBab(double classBab) {
        this.bab += classBab;
    }

    public void decrementBab(double classBab) {
        this.bab -= classBab;
    }

    public void raceLevelAdjustment(byte lvAdj) {
        this.bab = (lvAdj * 0.5) - 0.5;
        this.levelAdjustment = lvAdj;
        this.vitality = vitality.setRaceLevelAdjustmentHP(lvAdj, vitality, abilitys);
        this.skillPoints = lvAdj * 2;
    }

    public void hitPointsFirstLevel(int hitDice) {

        Vitality hP = vitality.createHPFirstLevel(hitDice, abilitys, vitality);
        this.vitality = hP;

    }

    public void resetHitPointsFirstLevel(int hitDice) {

        Vitality hP = vitality.createHPFirstLevel(hitDice, abilitys, vitality);
        this.vitality = hP;

    }

    public void hitPointsNewLevel(int hitDice) {

        Integer hD = vitality.hitDices.get(hitDice);

        if (hD == null) {
            hD = 1;
        } else {
            hD++;
        }

        this.vitality.hitDices.put(hitDice, hD);

        int hP = vitality.hitPointsAtNewLevel(hitDice, vitality, abilitys, effectiveCharacterLv);

        this.vitality.setHitPoints(hP);

    }

    public void hitPointsLastLevel(int hitDice) {

        if (vitality.getHitDices().get(hitDice) == 1) {
            vitality.removeHDClass(hitDice);
        } else {
            int lv = vitality.getHitDices().get(hitDice) - 1;
            vitality.hitDices.put(hitDice, lv);
        }

        int hP = vitality.hitPointsAtLastLevel(hitDice, vitality, abilitys, effectiveCharacterLv);

        this.vitality.setHitPoints(hP);
    }

    public void setCharacterRace(Race race) {
        this.race = race.getRacesName();
        this.subRace = race.getSubRaceName();
    }

    public void addSkill(String skills) {

        Gson gson = new Gson();

        Type listSkill = new TypeToken<List<ClassSkills>>() {
        }.getType();
        List<ClassSkills> skill = gson.fromJson(skills, listSkill);

        for (ClassSkills clSk : classSkills) {
            for (ClassSkills sk : skill) {
                if (clSk.getNameSkill().equals(sk.getNameSkill())) {
                    clSk.setSkillDifferentBonus(clSk.getSkillDifferentBonus() + (int) sk.getSkillRank());
                }
            }
        }
    }

    public void addSpecialAttacks(String specialAttacksFeat) {

        Gson gson = new Gson();
        SpecialAttacks spAtt = gson.fromJson(specialAttacksFeat, SpecialAttacks.class);

        this.specialAttacks.addSpecialAttackFeat(spAtt, this.specialAttacks);

    }

    public void addAbilityRace(String raceAbilitys) {

        Gson gson = new Gson();
        Abilitys jsonObjectAbilitys = gson.fromJson(raceAbilitys, Abilitys.class);

        this.abilitys.addRaceAbilitys(jsonObjectAbilitys, abilitys);

    }

    public void createArmorClass() {
        this.armorClass = new ArmorClass();
    }

    public void raceBonusArmorClass(String armorClass) {

        Gson gson = new Gson();
        ArmorClass jsonObjectArmorClass = gson.fromJson(armorClass, ArmorClass.class);

        this.armorClass.setNaturalArmor(jsonObjectArmorClass.getNaturalArmor());
    }

    public ArrayList<CharacterFeat> listFeatsFromClass(
            int lv, List<Feats> featsListInDB, String classFeatsMap) {

        ArrayList<CharacterFeat> characterFeatsFromClassArray = new ArrayList<CharacterFeat>();
        Gson gson = new Gson();
        Type listFeats = new TypeToken<List<ClassFeats>>() {
        }.getType();
        List<ClassFeats> featsJson = gson.fromJson(classFeatsMap, listFeats);

        for (ClassFeats featInJson : featsJson) {
            if (featInJson.getLevel() == lv) {
                for (Feats featInList : featsListInDB) {
                    HashSet<String> fList = featInJson.getClassFeats();
                    for (String featString : fList) {
                        if (featInList.getFeatName().equals(featString)) {
                            CharacterFeat newCharFeat = new CharacterFeat(
                                    featInList.getId(),
                                    1,
                                    featInList.getFeatName(),
                                    featInList.getDescription(),
                                    featInList.getFeatsType());
                            characterFeatsFromClassArray.add(newCharFeat);
                        }
                    }
                }
            }
        }
        return characterFeatsFromClassArray;
    }

    public boolean buyFeat(Feats feat) {

        boolean buyed = false;

        if (feat.getFeatsType() == FeatsTypeEnum.CLASS) {
            return false;
        }

        CharacterFeat characterFeat = new CharacterFeat(
                feat.getId(), 1, feat.getFeatName(), feat.getDescription(), feat.getFeatsType());

        boolean featPresent = false;
        for (CharacterFeat cF : this.featsList) {
            if (cF.getCharacterFeatName().equals(characterFeat.getCharacterFeatName())) {
                featPresent = true;
            }
        }

        if (!featPresent) {
            if (feat.getPrerequisite() == null) {
                this.featsList.add(characterFeat);
                buyed = true;
            } else {
                boolean prereqCheck = characterFeat.checkPrerequisite(
                        feat,
                        subRace, savingThrow, armorClass, classSkills, abilitys, (int) bab,
                        featsList);
                if (prereqCheck) {
                    this.featsList.add(characterFeat);
                    buyed = true;
                }
            }
        }
        return buyed;
    }

    public void addSpeed(int speed) {
        this.speed += speed;
    }

    public void sizeCharacter(SizeEnum size) {
        Size sizeNew = new Size();
        sizeNew.sizeBonus(size);
        this.size = sizeNew;
        this.armorClass.setSizeBonus(sizeNew.getBonusAttackAc());
        for (ClassSkills skill : classSkills) {
            if (skill.getNameSkill().equals("hide")) {
                skill.setSkillDifferentBonus(+sizeNew.getHide());
            }
        }
    }

    public SizeEnum sizeCharacter() {
        return this.size.getSize();
    }

    public void addFeatToPc(CharacterFeat ft) {
        if (ft.findFeatIndexinArrayById(featsList) > -1) {
            for (CharacterFeat fPc : featsList) {
                if (fPc.getId() == ft.getId()) {
                    fPc.incrementLevelFeat();
                }
            }
        } else {
            featsList.add(ft);
        }
    }

    public void removeFeatFromPc(CharacterFeat ft) {

        int indexFeat = ft.findFeatIndexinArrayById(featsList);
        if (indexFeat > -1) {
            if (featsList.get(indexFeat).getLevelOfFeat() == 1) {
                featsList.remove(indexFeat);
            } else {
                featsList.get(indexFeat).decrementLevelFeat();
            }
        }
    }

    public void allSkillsFalse() {
        for (ClassSkills cS : classSkills) {
            cS.setClassSkill(false);
        }
    }

    public void buyItems(Items itemToBuy) {
        this.items.add(itemToBuy);
    }

    public void sellItem(int indexToSell) {
        this.items.remove(indexToSell);
    }

    public void addStudyToCharacter(Set<Study> availableStudy) {

        for (Study studyOfClass : availableStudy) {
            for (ClassSkills cS : classSkills) {
                if (studyOfClass.getRelatedSkill().equals(cS.getNameSkill())) {
                    cS.addStudyMapToSkill(studyOfClass);
                }
            }
        }
    }

    public void removeStudyFromCharacter(Set<Study> availableStudy) {
        for (ClassSkills cS : classSkills) {
            if (!cS.getFieldOfStudy().isEmpty()) {
                for (Study study : availableStudy) {
                    if (study.getRelatedSkill().equals(cS.getNameSkill())) {
                        cS.removeStudyFromKnowledge(cS.getFieldOfStudy(), study.getStudyName());
                    }
                }
            }
        }
    }

    public void allKnowledgeZero() {
        for (ClassSkills cS : classSkills) {
            if (!cS.getFieldOfStudy().isEmpty()) {
                HashMap<String, Integer> emptyKnow = new HashMap<>();
                cS.setFieldOfStudy(emptyKnow);
            }
        }
    }

    public void addMagic(List<SpellsTable> spellsTableList, SpellsEnum spellDay, SpellsEnum spellKnown) {

        for (SpellsTable table : spellsTableList) {
            ArrayList<SpellsInLevel> spellsInLevelFromDB = MapperSpellsInLevel
                    .toSpellsInLevel(table.getSpellsInLevel());
            if (table.getSpellsDayKnown() != null) {
                for (ClassPc classPc : classPcArray) {

                    if (table.getSpellsDayKnown() == SpellsEnum.DAY &&
                            table.getMagicClass() == classPc.getSpellsPerDay()) {

                        for (SpellsInLevel spellsInThisLevel : spellsInLevelFromDB) {
                            if (classPc.getLevel() == spellsInThisLevel.getLevel()) {
                                this.magicPerDay.put(classPc.getName(), spellsInThisLevel.getSpells());
                            }
                        }
                    }

                    if (table.getSpellsDayKnown() == SpellsEnum.KNOWN &&
                            table.getMagicClass() == classPc.getSpellsKnown()) {

                        for (SpellsInLevel spellsInThisLevel : spellsInLevelFromDB) {
                            if (classPc.getLevel() == spellsInThisLevel.getLevel()) {
                                this.magicKnown.put(classPc.getName(), spellsInThisLevel.getSpells());
                                // if (this.spellsKnown.isEmpty() || !this.spellsKnown.containsKey(classPc.getName())) {
                                //     ArrayList<SpellsInCharLevel> spellsInCharLevels = new ArrayList<>();
                                //     this.spellsKnown.put(classPc.getName(), spellsInCharLevels);
                                // }
                            }
                        }
                    }
                }
            }
        }
    }

    public void removeMagicClass(EnumClass name) {

        this.magicKnown.remove(name);
        this.magicPerDay.remove(name);
        this.spellsKnown.remove(name);

    }

    public EnumClass characterGetClassEnumById(int idClass) {

        for (ClassPc clPc : this.classPcArray) {
            if (idClass == clPc.getId()) {
                return clPc.getName();
            }
        }
        return null;
    }

    public SpellsEnum characterGetSpellClassById(int idClass) {

        for (ClassPc clPc : this.classPcArray) {
            if (idClass == clPc.getId()) {
                return clPc.getSpells_domain();
            }
        }
        return null;
    }

    public boolean getClassSpellsKnown(EnumClass className) {
        for (SpellsInCharLevel sICLinDB : this.spellsKnown){
            if(sICLinDB.getCaster() == className){
                return sICLinDB.getCaster() == className;
            }
        } return false;
    }

    public void addNewSpellsKnown(int sizeMagic, EnumClass name) {

        SpellsInCharLevel sICK = new SpellsInCharLevel(name);
        do {
            sICK.getSpells().put(sizeMagic, new ArrayList<>());
            sizeMagic--;
        } while (sizeMagic == 0);
        this.spellsKnown.add(sICK);

    }

    public void addSpellKnown(int sizeMagic, EnumClass name){

        for(SpellsInCharLevel sICKinDB : this.spellsKnown){
            if(sICKinDB.getCaster() == name && sICKinDB.getSpells().size() == sizeMagic){
                sICKinDB.getSpells().put(sizeMagic, new ArrayList<>());
            }
        }
    }

    public void addSpells(Integer spellToAdd, EnumClass classNameE, int lv) {

        for(SpellsInCharLevel sICK : this.spellsKnown){
            if(sICK.getCaster() == classNameE){
                sICK.getSpells().get(lv).add(spellToAdd);
            }
        }
    }



    // public void addNewSpellsKnown(int sizeMagic, @NonNull EnumClass name) {
    //     SpellsInCharLevel sICK = new SpellsInCharLevel(sizeMagic);
    //     this.spellsKnown.get(name).add(sICK);
    // }

    // public boolean checkLvSpellsKnown(int sizeMagic, @NonNull EnumClass name) {
    //     for (SpellsInCharLevel spellCellLv : this.spellsKnown.get(name)) {
    //         if (sizeMagic <= spellCellLv.getLevel()) {
    //             return false;
    //         }
    //     }
    //     return true;
    // }

    // public HashMap<EnumClass, Integer> getAllCasterAndMaxLv() {

    //     HashMap<EnumClass, Integer> listOfCasterMaxLv = new HashMap<>();

    //     for (EnumClass enumClass : this.spellsKnown.keySet()) {
    //         Integer sizeInt = this.spellsKnown.get(enumClass).size();
    //         listOfCasterMaxLv.put(enumClass, sizeInt);
    //     }
    //     return listOfCasterMaxLv;
    // }

    // public void removeSepll(EnumClass classNameE, int[] spells) {

    //     for (int spell : spells) {
    //         for (SpellsInCharLevel level : this.spellsKnown.get(classNameE)) {
    //             int index = level.indexSpell(spell);
    //             if (index != -1) {
    //                 level.removeSpell(index);
    //             }
    //         }
    //     }
    // }

    // public ArrayList<SpellsInCharLevel> addSpellsFromList(
    //     List<Spells> spellsList,
    //     int[] spellsAddDTO,
    //     SpellsEnum spellClassE,
    //     EnumClass classNameE,
    //     int maxLv) {

    //     Integer lv = 0;

    //     ArrayList<SpellsInCharLevel> knowInChar = this.spellsKnown.get(classNameE);

    //     if(spellClassE != null){
    //         for (int s : spellsAddDTO){
    //             for (Spells spell : spellsList){
    //                 if(s == spell.getId()){
    //                     Integer spellToAdd = spell.selectSpellsForClass(spellClassE, maxLv);
    //                     if (spellToAdd != null){
    //                         lv = spell.selectSpellByLv(spell);
    //                     }

    //                     if (spellToAdd != null){
                            
    //                         for (SpellsInCharLevel spellCharClass : knowInChar) {
    //                             spellCharClass.addSpell(spellToAdd, lv);
    //                             knowInChar.add(spellCharClass);
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     } return knowInChar;
    // }

    // public void addSpellForLevel(SpellsInCharLevel sICL, EnumClass classNameE) {

    //     this.spellsKnown.get(classNameE).add(sICL);

    // }

}
