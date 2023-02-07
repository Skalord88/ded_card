package ded_card.Skills;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class RunSkillsPoints{

    private SkillsPointsRepo skillsPointsRepo;
    
    @Autowired
    public RunSkillsPoints(SkillsPointsRepo skillsPointsRepo){
        this.skillsPointsRepo = skillsPointsRepo;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void runSkillsPoints(){
        SkillsPoints skillsPoints1 = new SkillsPoints(8);
        skillsPointsRepo.save(skillsPoints1);
        SkillsPoints skillsPoints2 = new SkillsPoints(6);
        skillsPointsRepo.save(skillsPoints2);
        SkillsPoints skillsPoints3 = new SkillsPoints(4);
        skillsPointsRepo.save(skillsPoints3);
        SkillsPoints skillsPoints4 = new SkillsPoints(2);
        skillsPointsRepo.save(skillsPoints4);
    }
}