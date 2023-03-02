package pl.kolendateam.dadcard.characterCard;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    public List <ListRace> getListRace(@RequestParam String raceName){

        return listRaceRepository.findByRaceName(raceName);

    }
    
}
