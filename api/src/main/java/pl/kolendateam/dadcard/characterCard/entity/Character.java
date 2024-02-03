package pl.kolendateam.dadcard.characterCard.entity;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.mapping.Array;
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
import pl.kolendateam.dadcard.skills.dto.SkillToAddDTO;
import pl.kolendateam.dadcard.skills.dto.StudyDTO;
import pl.kolendateam.dadcard.skills.entity.ClassSkills;
import pl.kolendateam.dadcard.skills.entity.Skills;
import pl.kolendateam.dadcard.skills.entity.Study;
import pl.kolendateam.dadcard.spells.MapperSpellsInLevel;
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

    @JdbcTypeCode(SqlTypes.JSON)
    ArrayList<ClassPc> classPcArray;

    @JdbcTypeCode(SqlTypes.JSON)
    Size size;

    String race;
    String subRace;

    @JdbcTypeCode(SqlTypes.JSON)
    Vitality vitality;

    int speed;

    @JdbcTypeCode(SqlTypes.JSON)
    ArmorClass armorClass;

    double bab;

    @JdbcTypeCode(SqlTypes.JSON)
    SpecialAttacks specialAttacks;

    @JdbcTypeCode(SqlTypes.JSON)
    SavingThrow savingThrow;

    @JdbcTypeCode(SqlTypes.JSON)
    Abilitys abilitys;

    double skillPoints;

    @JdbcTypeCode(SqlTypes.JSON)
    ArrayList<ClassSkills> classSkills;

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

    short effectiveCharacterLv;
    byte levelAdjustment;

    public Character(String characterName, String playerName) {
        this.characterName = characterName;
        this.playerName = playerName;
        this.classPcArray = new ArrayList<>();
        this.size = new Size();
        this.vitality = new Vitality(0, new HashMap<>(), 0);
        this.armorClass = new ArmorClass();
        this.specialAttacks = new SpecialAttacks(0, 0, 0, 0, 0, 0);
        this.savingThrow = new SavingThrow(0, 0, 0);
        this.abilitys = new Abilitys();
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

        this.classSkills.forEach(cSkill -> {
            availableStudy.forEach(study -> {
                if(cSkill.getIdSkill() == study.getIdSkill()){
                    cSkill.addStudyMapToSkill(study);
                }
            });
        });
    }

    public void removeStudyFromCharacter(Set<Study> availableStudy) {
        for (ClassSkills cS : classSkills) {
            if (!cS.getFieldOfStudy().isEmpty()) {
                for (Study study : availableStudy) {
                    if (study.getId() == cS.getIdSkill()) {
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
        for (SpellsInCharLevel sICLinDB : this.spellsKnown) {
            if (sICLinDB.getCaster() == className) {
                return sICLinDB.getCaster() == className;
            }
        }
        return false;
    }

    public void addNewSpellsKnown(int sizeMagic, EnumClass name) {

        SpellsInCharLevel sICK = new SpellsInCharLevel(name);
        do {
            sICK.getSpells().put(sizeMagic, new ArrayList<>());
            sizeMagic--;
        } while (sizeMagic == 0);
        this.spellsKnown.add(sICK);

    }

    public void addSpellKnown(int sizeMagic, EnumClass name) {

        for (SpellsInCharLevel sICKinDB : this.spellsKnown) {
            if (sICKinDB.getCaster() == name && sICKinDB.getSpells().size() == sizeMagic) {
                sICKinDB.getSpells().put(sizeMagic, new ArrayList<>());
            }
        }
    }

    public void addSpells(Integer spellToAdd, EnumClass classNameE, int lv) {

        for (SpellsInCharLevel sICK : this.spellsKnown) {
            if (sICK.getCaster() == classNameE) {
                sICK.getSpells().forEach((i, a) -> {
                    if (i == lv) {
                        a.add(spellToAdd);
                    }
                });
            }
        }
    }

    public void removeSpell(EnumClass classNameE, int[] spells) {

        for (int spell : spells) {
            for (SpellsInCharLevel sICL : this.spellsKnown) {
                if (sICL.getCaster() == classNameE) {
                    sICL.getSpells().forEach((i, sp) -> sp.removeIf(s -> s == spell));
                }
            }
        }
    }

    public boolean magicClass(SpellsEnum spellsPerDay) {
        if (spellsPerDay == null) {
            return false;
        }
        return true;
    }

    public void buySkills(List<SkillToAddDTO> skillsToAddDTO) {
        // gli skill points massimi devono rimanere invariati e separatamente va
        // ricalcolato il pool degli attuali
        double actualSkillPoints = this.skillPoints;

        for (SkillToAddDTO skill : skillsToAddDTO) {
            actualSkillPoints -= skill.skillRank;
        }

        for (SkillToAddDTO skillToAddDTO : skillsToAddDTO) {
            for (ClassSkills skill : classSkills) {
                if (skill.getIdSkill() == skillToAddDTO.idSkill) {
                    boolean check = true;
                    if (actualSkillPoints < 0) {
                        check = false;
                    }
                    if ((int) skillToAddDTO.skillRank > this.effectiveCharacterLv + 3) {
                        check = false;
                    }
                    // if (skill.isClassSkill() == true
                    // && skill.getSkillRank() >= this.effectiveCharacterLv + 3) {
                    // check = false;
                    // }
                    // double doubleLEP = (this.effectiveCharacterLv + 3) / 2;
                    // if (skill.isClassSkill() == false && skill.getSkillRank() >= (int) doubleLEP)
                    // {
                    // check = false;
                    // }
                    if (check == true) {
                        if (skill.isClassSkill() == true) {
                            skill.setSkillRank(skillToAddDTO.skillRank);

                        }
                        if (skill.isClassSkill() == false) {
                            skill.setSkillRank(skillToAddDTO.skillRank / 2);

                        }
                    }
                }
            }
        }
    }

    public void zeroSkillsRank() {
        for (ClassSkills classSkill : this.classSkills) {
            classSkill.setSkillRank(0);
            if (!classSkill.getFieldOfStudy().isEmpty()) {
                classSkill.zeroStudyRank();
            }
        }
    }

    public void addStudy(ArrayList<StudyDTO> studyToAdd) {

        studyToAdd.forEach(study -> {
            classSkills.forEach(skill -> {
                if(study.idSkill == skill.getIdSkill()){
                    skill.getFieldOfStudy().put(study.study, study.rank);
                }
            });
        });
    }
}