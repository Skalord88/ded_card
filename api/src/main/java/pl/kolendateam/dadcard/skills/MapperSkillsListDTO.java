package pl.kolendateam.dadcard.skills;

import java.util.ArrayList;
import java.util.List;

import pl.kolendateam.dadcard.skills.dto.SkillListDTO;
import pl.kolendateam.dadcard.skills.entity.Skills;

public class MapperSkillsListDTO {

    
    public static ArrayList<SkillListDTO> toSkillsDTOList(List<Skills> skillsList){
        ArrayList<SkillListDTO> skillListDTO = new ArrayList<>();

        for(Skills sk : skillsList){
            SkillListDTO skillDTO = new SkillListDTO(sk.getId(),sk.getName(),sk.getAbility());
            skillListDTO.add(skillDTO);
        }
        return skillListDTO;
    }
    
}
