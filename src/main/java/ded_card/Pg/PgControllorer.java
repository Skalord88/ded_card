package ded_card.Pg;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ded_card.Classes.ClassName;
import ded_card.Classes.Classes;
import ded_card.Classes.ClassesRepo;
import ded_card.Races.RaceRepo;
import ded_card.Races.Races;
import ded_card.Races.RacesName;
import ded_card.Races.SubRacesName;
import ded_card.mod.ModAbilities;
import ded_card.mod.ModAbilitiesRepo;

@RestController
public class PgControllorer {

    @Autowired
    RaceRepo raceRepo;
    ModAbilitiesRepo modAbilitiesRepo;
    PgRepo pgRepo;
    ClassesRepo classesRepo;

    public PgControllorer(RaceRepo raceRepo, ModAbilitiesRepo modAbilitiesRepo,
    PgRepo pgRepo, ClassesRepo classesRepo
    ){
        
        this.raceRepo=raceRepo;
        this.modAbilitiesRepo=modAbilitiesRepo;
        this.pgRepo=pgRepo;
        this.classesRepo=classesRepo;

    }
        
    @PostMapping("/pg/newPg")
    @ResponseBody
    public Pg pg(
    @RequestParam("Str") int pgStrenght, @RequestParam("Dex") int pgDextrity, @RequestParam("Con") int pgConsitution,
    @RequestParam("Int") int pgIntelligence, @RequestParam("Wis") int pgWisdom, @RequestParam("Cha") int pgCharisma,
    @RequestParam("racesName") RacesName racesName, @RequestParam("subRacesName") SubRacesName subRacesName,@RequestParam("class") ClassName nameClass,
    @RequestParam("className") ClassName className
    ){

        Pg pg = new Pg();

        pg.setPgRacesName(racesName);
        pg.setPgSubRacesName(subRacesName);

        pg.setPgStrenght(pgStrenght);
        pg.setPgDextrity(pgDextrity);
        pg.setPgConsitution(pgConsitution);
        pg.setPgIntelligence(pgIntelligence);
        pg.setPgWisdom(pgWisdom);
        pg.setPgCharisma(pgCharisma);

        List <Races> subraces = raceRepo.findSubRacesBySubRacesName(subRacesName);

        int strenght = subraces.get(0).getStrenght();
        int dextrity = subraces.get(0).getDextrity();
        int consitution = subraces.get(0).getConsitution();
        int intelligence = subraces.get(0).getIntelligence();
        int wisdom = subraces.get(0).getWisdom();
        int charisma = subraces.get(0).getCharisma();

        pg.setPgStrenght(pg.getPgStrenght()+strenght);
        pg.setPgDextrity(pg.getPgDextrity()+dextrity);
        pg.setPgConsitution(pg.getPgConsitution()+consitution);
        pg.setPgIntelligence(pg.getPgIntelligence()+intelligence);
        pg.setPgWisdom(pg.getPgWisdom()+wisdom);
        pg.setPgCharisma(pg.getPgCharisma()+charisma);

        int abilities = pg.getPgStrenght();
        List<ModAbilities> modabilitiesS = modAbilitiesRepo.findModAbilitiesByAbilities(abilities);
        pg.setPgModStrenght(modabilitiesS.get(0).getModAbilities());
        
        abilities = pg.getPgDextrity();
        List<ModAbilities> modabilitiesD = modAbilitiesRepo.findModAbilitiesByAbilities(abilities);
        pg.setPgModDextrity(modabilitiesD.get(0).getModAbilities());

        abilities = pg.getPgConsitution();
        List<ModAbilities> modabilitiesC = modAbilitiesRepo.findModAbilitiesByAbilities(abilities);
        pg.setPgModConsitution(modabilitiesC.get(0).getModAbilities());

        abilities = pg.getPgIntelligence();
        List<ModAbilities> modabilitiesI = modAbilitiesRepo.findModAbilitiesByAbilities(abilities);
        pg.setPgModIntelligence(modabilitiesI.get(0).getModAbilities());

        abilities = pg.getPgWisdom();
        List<ModAbilities> modabilitiesW = modAbilitiesRepo.findModAbilitiesByAbilities(abilities);
        pg.setPgModWisdom(modabilitiesW.get(0).getModAbilities());
        
        abilities = pg.getPgCharisma();
        List<ModAbilities> modabilitiesCh = modAbilitiesRepo.findModAbilitiesByAbilities(abilities);
        pg.setPgModCharisma(modabilitiesCh.get(0).getModAbilities());

        List<Classes> classesBAB = classesRepo.findBaseAttackBonusByClassName(className);
        pg.setPgBaseAttackBonus(classesBAB.get(0).getBaseAttackBonus()+pg.getPgModStrenght());

        List<Classes> classesF = classesRepo.findFortitudeByClassName(className);
        pg.setPgFortitude(classesF.get(0).getFortitude()+pg.getPgModConsitution());

        List<Classes> classesR = classesRepo.findReflexByClassName(className);
        pg.setPgReflex(classesR.get(0).getReflex()+pg.getPgModDextrity());

        List<Classes> classesW = classesRepo.findWillByClassName(className);
        pg.setPgWill(classesW.get(0).getWill()+pg.getPgModWisdom());

        List<Classes> classesSP = classesRepo.findSkillPointsByClassName(className);
        pg.setPgSkillPoints(classesSP.get(0).getSkillPoints()+pg.getPgIntelligence());

        int skillPoints = pg.getPgSkillPoints();
        if (skillPoints>0){
            pg.setPgSkillPoints(skillPoints*4);
        } else {
            pg.setPgSkillPoints(4);
        }

        

        return pgRepo.save(pg);

    }

}
