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

@RestController
public class PgControllorer {

    @Autowired
    RaceRepo raceRepo;

    public PgControllorer(RaceRepo raceRepo){
        
        this.raceRepo=raceRepo;
        
    }

    
    @GetMapping("pg/{newPg}")
    public Pg pgRace(@PathVariable("newPg")int pgStrenght, int pgDextrity, int pgConsitution, int pgIntelligence,
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
        return pg;

    }

}
