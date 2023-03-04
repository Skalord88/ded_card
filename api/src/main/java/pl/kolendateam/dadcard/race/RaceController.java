package pl.kolendateam.dadcard.race;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.kolendateam.dadcard.race.dto.RaceBaseDTO;
import pl.kolendateam.dadcard.race.dto.SubRaceBaseDTO;
import pl.kolendateam.dadcard.race.entity.Race;

@RestController
@RequestMapping("race")
public class RaceController {

    RaceRepository raceRepository;

    @Autowired
    RaceController(RaceRepository raceRepository) {
        this.raceRepository = raceRepository;
    }

    @GetMapping("")
    public ArrayList<RaceBaseDTO> getAll() {
        List<Race> races = this.raceRepository.findAll();

        return MaperListRaceToDTO.raceToRaceBaseDTO(races);
    }
}
