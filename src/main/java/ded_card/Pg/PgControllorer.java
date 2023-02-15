package ded_card.Pg;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

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

    public PgControllorer(RaceRepo raceRepo, ModAbilitiesRepo modAbilitiesRepo){
        
        this.raceRepo=raceRepo;
        this.modAbilitiesRepo=modAbilitiesRepo;
        
    }
    
    @GetMapping("pg/{newPg}")
    public Pg pg(@PathVariable("newPg")int pgStrenght, int pgDextrity, int pgConsitution, int pgIntelligence,
    int pgWisdom, int pgCharisma, RacesName racesName, SubRacesName subRacesName){

        Pg pg = new Pg();

        pg.setPgRacesName(racesName);

        List <Races> races = raceRepo.findAllSubRacesNameByRacesName(racesName);

        for (Races x : races){

            System.out.println(x.getSubRacesName());

        }

        pg.setPgStrenght(pgStrenght);
        pg.setPgDextrity(pgDextrity);
        pg.setPgConsitution(pgConsitution);
        pg.setPgIntelligence(pgIntelligence);
        pg.setPgWisdom(pgWisdom);
        pg.setPgCharisma(pgCharisma);

        List <Races> subraces = raceRepo.findBySubRacesName(subRacesName);

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

        return pg;

    }

}
