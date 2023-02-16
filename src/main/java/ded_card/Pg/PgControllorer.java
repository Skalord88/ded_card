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
    
    ///{newPg}
    //@RequestParam("newPg")
    
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
        int consitution = subraces.get(0).getDextrity();
        int intelligence = subraces.get(0).getDextrity();
        int wisdom = subraces.get(0).getDextrity();
        int charisma = subraces.get(0).getDextrity();

        pg.setPgStrenght(pg.getPgStrenght()+strenght);
        pg.setPgStrenght(pg.getPgDextrity()+dextrity);
        pg.setPgStrenght(pg.getPgConsitution()+consitution);
        pg.setPgStrenght(pg.getPgIntelligence()+intelligence);
        pg.setPgStrenght(pg.getPgWisdom()+wisdom);
        pg.setPgStrenght(pg.getPgCharisma()+charisma);

        int abilities = pg.getPgStrenght();
        List<ModAbilities> modabilities = modAbilitiesRepo.findModAbilitiesByAbilities(abilities);
        pg.setPgModStrenght(modabilities.get(0).getModAbilities());
        
        abilities = pg.getPgDextrity();
        pg.setPgModDextrity(modabilities.get(0).getModAbilities());

        abilities = pg.getPgConsitution();
        pg.setPgModConsitution(modabilities.get(0).getModAbilities());

        abilities = pg.getPgIntelligence();
        pg.setPgModIntelligence(modabilities.get(0).getModAbilities());

        abilities = pg.getPgWisdom();
        pg.setPgModWisdom(modabilities.get(0).getModAbilities());
        
        abilities = pg.getPgCharisma();
        pg.setPgModCharisma(modabilities.get(0).getModAbilities());

        List<Classes> classes = classesRepo.findBaseAttackBonusByClassName(className);

        pg.setPgBaseAttackBonus(classes.get(0).getBaseAttackBonus()+pg.getPgModStrenght());
        pg.setPgFortitude(classes.get(0).getFortitude()+pg.getPgModConsitution());
        pg.setPgReflex(classes.get(0).getReflex()+pg.getPgModDextrity());
        pg.setPgWill(classes.get(0).getWill()+pg.getPgModWisdom());
        pg.setPgSkillPoints(classes.get(0).getSkillPoints()+pg.getPgIntelligence());

        double skillPoints = pg.getPgSkillPoints();
        if (skillPoints>0){
            pg.setPgSkillPoints(skillPoints*4);
        } else {
            pg.setPgSkillPoints(4);
        }

        return pgRepo.save(pg);

    }

}
