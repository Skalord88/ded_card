package pl.kolendateam.dadcard.feats;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.kolendateam.dadcard.feats.dto.FeatsDTO;
import pl.kolendateam.dadcard.feats.entity.Feats;
import pl.kolendateam.dadcard.feats.repository.FeatsRepository;

@RestController
@RequestMapping("feats")
public class FeatsController {

    FeatsRepository featsRepository;
    
    @Autowired
    public FeatsController(FeatsRepository featsRepository){
        this.featsRepository = featsRepository;
    }

    @GetMapping("")
    public List<FeatsDTO> showFeatsList(){

        List<Feats> featsList = this.featsRepository.findAll();
        
        return MapperFeatsDTO.toFeatsDTO(featsList);
    }
}
