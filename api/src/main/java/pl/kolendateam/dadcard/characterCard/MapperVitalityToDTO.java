package pl.kolendateam.dadcard.characterCard;

import java.util.HashMap;

import pl.kolendateam.dadcard.characterCard.dto.VitalityDTO;
import pl.kolendateam.dadcard.characterCard.entity.Vitality;

public class MapperVitalityToDTO {
    public static VitalityDTO toVitalityDTO(Vitality vitality){
        VitalityDTO vitalityDTO = new VitalityDTO(
            vitality.getLife(),
            vitality.getHitDices(),
            vitality.getHitPoints()
        );
        return vitalityDTO;
    }
    
}
