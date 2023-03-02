package pl.kolendateam.dadcard.characterCard;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pl.kolendateam.dadcard.characterCard.entity.ListRace;
import pl.kolendateam.dadcard.characterCard.repository.ListRaceRepository;

@RestController
@RequestMapping("list")
public class ListRaceController {

    ListRaceRepository listRaceRepository;

    @Autowired
    public ListRaceController(ListRaceRepository listRaceRepository){
        this.listRaceRepository = listRaceRepository;
    }

    @GetMapping("/listrace")
    public HashSet <String> getListRace(){

        List <ListRace> listRace = listRaceRepository.findAll();

        HashSet <String> races = new HashSet<>();

        for (ListRace x : listRace){
            races.add(x.getRaceName());
        }
        
        return races;
        
    }

    @GetMapping("/listsubrace")
    public List <ListRace> getListSubRace(@RequestParam String raceName){

        return listRaceRepository.findByRaceName(raceName);

    }
    
}
