package pl.kolendateam.dadcard.skills;

import java.util.ArrayList;
import java.util.List;

import pl.kolendateam.dadcard.skills.dto.RaceSkillsDTO;
import pl.kolendateam.dadcard.skills.dto.SkillsDTO;
import pl.kolendateam.dadcard.skills.entity.ClassSkills;

public class MapperSkillsToDTO {
    public static ArrayList<SkillsDTO> toSkillsDTO(ArrayList<ClassSkills> skillList){

        ArrayList<SkillsDTO> skillListDTO = new ArrayList<>();

        for(ClassSkills skill : skillList){
            SkillsDTO skillDTO = new SkillsDTO();
                skillDTO.idSkill = skill.getIdSkill();
                skillDTO.nameSkill = skill.getNameSkill();
                skillDTO.classSkill = skill.isClassSkill();
                skillDTO.skillRank = (int)skill.getSkillRank();

                skillListDTO.add(skillDTO);
        }

        return skillListDTO;
    }

    public static ArrayList<RaceSkillsDTO> toRaceSkillsDTO(List<ClassSkills> skillList){

        ArrayList<RaceSkillsDTO> skillListDTO = new ArrayList<>();
        for(ClassSkills skill : skillList){
            RaceSkillsDTO skillDTO = new RaceSkillsDTO();
                skillDTO.nameSkill = skill.getNameSkill();
                skillDTO.skillRank = (int)skill.getSkillRank();

                skillListDTO.add(skillDTO);
        }

        return skillListDTO;

    }
    
}
