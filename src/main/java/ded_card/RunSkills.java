package ded_card;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class RunSkills {
    
    private SkillsRepo skillsRepo;

    @Autowired
    public RunSkills(SkillsRepo skillsRepo){
        this.skillsRepo = skillsRepo;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void runSkills(){
        Skills skills1 = new Skills("Appraise");
        skillsRepo.save(skills1);
    }
}
