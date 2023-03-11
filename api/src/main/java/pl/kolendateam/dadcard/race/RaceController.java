package pl.kolendateam.dadcard.race;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;


import pl.kolendateam.dadcard.race.dto.RaceBaseDTO;
import pl.kolendateam.dadcard.race.dto.RegionBaseDTO;
import pl.kolendateam.dadcard.race.entity.Race;
import pl.kolendateam.dadcard.race.entity.Region;
import pl.kolendateam.dadcard.race.repository.RaceRepository;
import pl.kolendateam.dadcard.race.repository.RegionRepository;

@RestController
@RequestMapping("race")
public class RaceController {

    RaceRepository raceRepository;
    RegionRepository regionRepository;

    @Autowired
    RaceController(RaceRepository raceRepository) {
        this.raceRepository = raceRepository;
    }

    @GetMapping("")
    public ArrayList<RaceBaseDTO> getAll() {
        List<Race> races = this.raceRepository.findAll();

        return MaperListRaceToDTO.toRaceBaseDTO(races);
    }

    @GetMapping("{id}/region")
    public ArrayList<RegionBaseDTO> getRegionsForRace(@PathVariable int id){
        Optional<Race> raceOpt = this.raceRepository.findById(id);

        if(!raceOpt.isPresent()){
            throw new ResponseStatusException(
           HttpStatus.NOT_FOUND, "Race Not Found");
        }

        List<Region> regions = List.copyOf(raceOpt.get().getAvailableRegions());

        return MaperListRegionToDTO.toRegionBaseDTO(regions);
    }
}
