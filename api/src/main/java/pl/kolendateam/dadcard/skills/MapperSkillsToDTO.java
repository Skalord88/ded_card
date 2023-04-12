package pl.kolendateam.dadcard.skills;

import java.util.ArrayList;

import pl.kolendateam.dadcard.skills.dto.SkillsDTO;
import pl.kolendateam.dadcard.skills.entity.ClassSkills;

public class MapperSkillsToDTO {
    public static ArrayList<SkillsDTO> toSkillsDTO(ArrayList<ClassSkills> skillList){

        ArrayList<SkillsDTO> skillListDTO = new ArrayList<>();

        for(ClassSkills skill : skillList){
            SkillsDTO skillDTO = new SkillsDTO();
                skillDTO.nameSkill = skill.getNameSkill();
                skillDTO.classSkill = skill.isClassSkill();
                skillDTO.skillRank = skill.getSkillRank();

                skillListDTO.add(skillDTO);
        }

        return skillListDTO;
    }
    
}
