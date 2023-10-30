package pl.kolendateam.dadcard.characterCard;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import pl.kolendateam.dadcard.attack.entity.SpecialAttacks;
import pl.kolendateam.dadcard.characterCard.dto.CharacterDTO;
import pl.kolendateam.dadcard.characterCard.dto.CreateCharacterDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.characterCard.entity.Vitality;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPcDTO;
import pl.kolendateam.dadcard.classCharacter.entity.ClassCharacter;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPc;
import pl.kolendateam.dadcard.classCharacter.entity.SavingThrow;
import pl.kolendateam.dadcard.classCharacter.repository.ClassRepository;
import pl.kolendateam.dadcard.feats.entity.CharacterFeat;
import pl.kolendateam.dadcard.feats.entity.Feats;
import pl.kolendateam.dadcard.feats.repository.FeatsRepository;
import pl.kolendateam.dadcard.skills.dto.SkillsDTO;
import pl.kolendateam.dadcard.skills.entity.Skills;
import pl.kolendateam.dadcard.skills.repository.SkillsRepository;
import pl.kolendateam.dadcard.spells.entity.SpellsInCharLevel;
import pl.kolendateam.dadcard.spells.entity.SpellsTable;
import pl.kolendateam.dadcard.spells.repository.SpellsTableRepository;

@RestController
@RequestMapping("character-card")
public class CharacterController {

    ClassRepository classRepository;
    CharacterRepository characterRepository;
    FeatsRepository featsRepository;
    SkillsRepository skillsRepository;
    SpellsTableRepository spellsTableRepository;

    @Autowired
    public CharacterController(CharacterRepository characterRepository, ClassRepository classRepository,
            FeatsRepository featsRepository, SkillsRepository skillsRepository, SpellsTableRepository spellsTableRepository) {
        this.characterRepository = characterRepository;
        this.classRepository = classRepository;
        this.featsRepository = featsRepository;
        this.skillsRepository = skillsRepository;
        this.spellsTableRepository = spellsTableRepository;
    }

    @PostMapping(value = "", consumes = "application/json")
    public CreateCharacterDTO createCharacter(@RequestBody CreateCharacterDTO createCharacterDTO) {

        Character character = new Character(createCharacterDTO.characterName, createCharacterDTO.playerName);

        List<Skills> skillsList = this.skillsRepository.findAll();
        character.createSkillsArray(skillsList);

        SavingThrow savingThrow = new SavingThrow(0, 0, 0);
        character.setSavingThrow(savingThrow);

        HashMap<Integer, Integer> vitaMap = new HashMap<>();
        Vitality vitality = new Vitality(0, vitaMap, 0);
        character.setVitality(vitality);

        SpecialAttacks specialAttacks = new SpecialAttacks(0, 0, 0, 0, 0, 0);
        character.setSpecialAttacks(specialAttacks);

        this.characterRepository.save(character);

        return new CreateCharacterDTO(character);
    }

    @GetMapping(value = "{id}")
    public CharacterDTO showCharacter(@PathVariable int id) {

        Optional<Character> characterOpt = this.characterRepository.findById(id);

        if (!characterOpt.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Character Not Found");
        }

        Character character = characterOpt.get();
        return new CharacterDTO(character);
    }

    @PostMapping(value = "{id}/class", consumes = { "application/json" })
    public CharacterDTO setCharacterClass(@PathVariable int id, @RequestBody ClassPcDTO classPcDTO) {

        Optional<Character> characterOpt = this.characterRepository.findById(id);

        if (!characterOpt.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Character Not Found");
        }

        Character character = characterOpt.get();

        Optional<ClassCharacter> classOpt = this.classRepository.findById(classPcDTO.id);

        if (!classOpt.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Class Not Found");
        }

        List<Feats> featsList = this.featsRepository.findAll();
        List<SpellsTable> spellsTableList = this.spellsTableRepository.findAll();

        ClassCharacter classCharacter = classOpt.get();

        ArrayList<ClassPc> classPcList = character.getClassPcArray();

        ClassPc classPc = new ClassPc(
                classCharacter.getId(), classCharacter.getName(), (byte) 1,
                classCharacter.getHitDice(), classCharacter.getSavingThrow(),
                classCharacter.getClassBab(), classCharacter.getSpellsPerDay(),
                classCharacter.getSpellsKnown(), classCharacter.getSpellsDomain());

        character.incrementEffectiveCharacterLv();

        // skills & hp
        if (character.getEffectiveCharacterLv() == 1) {
            character.calculateSkillPointsFirstLevel(classCharacter.getSkillPoints());
            character.hitPointsFirstLevel(classCharacter.getHitDice());
        } else {
            character.calculateSkillPoints(classCharacter.getSkillPoints());
            character.hitPointsNewLevel(classCharacter.getHitDice());
        }

        // class
        int indexClassInDB = classPc.findIndexInArrayById(classPcList);

        if (indexClassInDB == -1) {
            character.addClassToPcArray(classPc);
            character.setSkillsTruePcArray(classCharacter.getAvailableSkills());
        } else {
            character.incrementLevelClassForIndex(indexClassInDB);
        }

        int levelClassInDB = classPc.findLevelInArrayById(classPcList, classCharacter.getId());

        // study
        character.addStudyToCharacter(classCharacter.getAvailableStudy());

        // saving throw
        if (levelClassInDB == 1) {
            character.addSavingThrowLevelOne(classPc.getSavingThrow());
        } else {
            character.incementSavingThrow();
        }

        character.incrementBab(classCharacter.getClassBab());

        // feat
        List<CharacterFeat> characterFeatsFromClass = character.listFeatsFromClass(
                levelClassInDB, featsList, classCharacter.getClassFeatsMap());

        for (CharacterFeat chFeat : characterFeatsFromClass) {
            character.addFeatToPc(chFeat);
        }

        //magic
        character.addMagic(spellsTableList,classCharacter.getSpellsPerDay(),classCharacter.getSpellsKnown());
        int sizeMagic = character.getMagicKnown().get(classCharacter.getName()).length-1;

        //magicKnown
        if(classCharacter.getSpellsKnown() != null){
            if(character.getSpellsKnown().get(classCharacter.getName()).isEmpty()){
                character.addSpellsKnown(sizeMagic,classCharacter.getName());
            } else {
                if(character.checkLvSpellsKnown(sizeMagic,classCharacter.getName())){
                    character.addNewSpellsKnown(sizeMagic,classCharacter.getName());
                }
            }
        }

        this.characterRepository.save(character);

        return new CharacterDTO(character);
    }

    @PostMapping(value = "{id}/minus_class", consumes = { "application/json" })
    public CharacterDTO minusCharacterClass(@PathVariable int id, @RequestBody ClassPcDTO classPcDTO) {

        Optional<Character> characterOpt = this.characterRepository.findById(id);

        if (!characterOpt.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Character Not Found");
        }

        Character character = characterOpt.get();

        Optional<ClassCharacter> classOpt = this.classRepository.findById(classPcDTO.id);

        if (!classOpt.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Class Not Found");
        }

        List<Feats> featsList = this.featsRepository.findAll();
        List<ClassCharacter> allClassesList = this.classRepository.findAll();
        List<SpellsTable> spellsTableList = this.spellsTableRepository.findAll();

        ClassCharacter classCharacter = classOpt.get();

        ArrayList<ClassPc> classPcList = character.getClassPcArray();

        ClassPc classPc = new ClassPc(
                classCharacter.getId(), classCharacter.getName(), (byte) 1,
                classCharacter.getHitDice(), classCharacter.getSavingThrow(),
                classCharacter.getClassBab(), classCharacter.getSpellsPerDay(),
                classCharacter.getSpellsKnown(), classCharacter.getSpellsDomain());

        // feat
        int levelClassInDB = classPc.findLevelInArrayById(classPcList, classCharacter.getId());
        List<CharacterFeat> characterFeatsFromClass = character.listFeatsFromClass(
                levelClassInDB, featsList, classCharacter.getClassFeatsMap());

        for (CharacterFeat chFeat : characterFeatsFromClass) {
            character.removeFeatFromPc(chFeat);
        }

        character.decrementEffectiveCharacterLv();

        // class
        int indexClassInDB = classPc.findIndexInArrayById(classPcList);
        if (levelClassInDB == 1) {
            character.removeClassFromPcArray(indexClassInDB);
            //remove magic table, if class is 0
            character.removeMagicClass(classPc.getName());
        }
        if (levelClassInDB > 1) {
            character.decrementLevelClassForIndex(indexClassInDB);
        }

        // skillPoints & hp
        if (character.getEffectiveCharacterLv() == 0) {
            character.setSkillPoints(0);
            HashMap<Integer, Integer> vitaHD = new HashMap<>();
            Vitality vita = new Vitality(0, vitaHD, 0);
            character.setVitality(vita);
        } else {
            character.decalculateSkillPoints(classCharacter.getSkillPoints());
            character.hitPointsLastLevel(classCharacter.getHitDice());
        }

        // re-trueSkills
        if (character.getClassPcArray().size() != 0) {
            for (ClassPc cP : character.getClassPcArray()) {
                for (ClassCharacter cC : allClassesList) {
                    if (cC.getId() == cP.getId()) {
                        character.setSkillsTruePcArray(cC.getAvailableSkills());
                    }
                }
            }
        } else {
            character.allSkillsFalse();
            character.allKnowledgeZero();
        }

        // study
        character.removeStudyFromCharacter(classCharacter.getAvailableStudy());

        // saving throw
        if (levelClassInDB > 1) {
            character.decementSavingThrow();
        }
        if (levelClassInDB == 1) {
            character.minusSavingThrowLevelOne(classPc.getSavingThrow());
        }

        //magic
        if (character.getClassPcArray() == null){
            character.setMagicKnown(null);
            character.setMagicPerDay(null);
        } else {
        character.addMagic(spellsTableList,classCharacter.getSpellsPerDay(),classCharacter.getSpellsKnown());
        }

        //base attack bonus
        character.decrementBab(classCharacter.getClassBab());

        this.characterRepository.save(character);

        return new CharacterDTO(character);

    }

    @PostMapping(value = "{id}/skill", consumes = { "application/json" })
    public CharacterDTO buyCharacterSkill(@PathVariable int id, @RequestBody SkillsDTO skillsDTO) {

        Optional<Character> characterOpt = this.characterRepository.findById(id);

        if (!characterOpt.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Character Not Found");
        }

        Character character = characterOpt.get();

        character.buySkills(skillsDTO.idSkill, skillsDTO.skillRank);

        this.characterRepository.save(character);
        return new CharacterDTO(character);
    }

}