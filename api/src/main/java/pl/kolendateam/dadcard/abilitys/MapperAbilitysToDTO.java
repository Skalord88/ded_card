package pl.kolendateam.dadcard.abilitys;

import pl.kolendateam.dadcard.abilitys.dto.AbilitysDTO;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;

public class MapperAbilitysToDTO {
    public static AbilitysDTO toAbilityDTO(Abilitys abilitys){
        
        AbilitysDTO abilitysDTO = new AbilitysDTO(
            abilitys.getStreght(),
            abilitys.getStreghtBonus(),
            abilitys.getDextrity(),
            abilitys.getDextrityBonus(),
            abilitys.getConstitution(),
            abilitys.getConstitutionBonus(),
            abilitys.getIntelligence(),
            abilitys.getIntelligenceBonus(),
            abilitys.getWisdom(),
            abilitys.getWisdomBonus(),
            abilitys.getCharisma(),
            abilitys.getCharismaBonus()
            );
            
            return abilitysDTO;
    }
}
