package ded_card;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import ded_card.Races.RaceRepo;
import ded_card.Races.Races;
import ded_card.Races.SubRacesName;

@RestController
public class PgControllorer {



    @Autowired
    RaceRepo raceRepo;

    //race str + class bab

    
    public PgControllorer(RaceRepo raceRepo){
        
        this.raceRepo=raceRepo;
        
    }

    @GetMapping("sila/{name}")
    public Pg subRaceStreght(@PathVariable("name") SubRacesName subRacesName){

        Pg pg = new Pg();

        List <Races> races = raceRepo.findBySubRacesName(subRacesName);

        int strenght = races.get(0).getStrenght();

        pg.pgStrenght = strenght;
        return pg;

    } 
    
    



}
