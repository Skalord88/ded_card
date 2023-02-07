package ded_card.Skills;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RunSkills {
    
    private SkillsRepo skillsRepo;

    @Autowired
    public RunSkills(SkillsRepo skillsRepo){
        this.skillsRepo = skillsRepo;
    }

    @GetMapping("dupa")
    public void runSkills(){
        Skills skills1 = new Skills("Appraise");
        skillsRepo.save(skills1);
        Skills skills2 = new Skills("Balance");
        skillsRepo.save(skills2);
        Skills skills3 = new Skills("Bluff");
        skillsRepo.save(skills3);
        Skills skills4 = new Skills("Climb");
        skillsRepo.save(skills4);
        Skills skills5 = new Skills("Concentration");
        skillsRepo.save(skills5);
        Skills skills6 = new Skills("Craft");
        skillsRepo.save(skills6);
        Skills skills7 = new Skills("Diplomacy");
        skillsRepo.save(skills7);
        Skills skills8 = new Skills("Disable Device");
        skillsRepo.save(skills8);
        Skills skills9 = new Skills("Disguise");
        skillsRepo.save(skills9);
        Skills skills10 = new Skills("Escape Artist");
        skillsRepo.save(skills10);
        Skills skills11 = new Skills("Appraise");
        skillsRepo.save(skills11);
        Skills skills12 = new Skills("Gather Information");
        skillsRepo.save(skills12);
        Skills skills13 = new Skills("Handle Animal");
        skillsRepo.save(skills13);
        Skills skills14 = new Skills("Heal");
        skillsRepo.save(skills14);
        Skills skills15 = new Skills("Hide");
        skillsRepo.save(skills15);
        Skills skills16 = new Skills("Jump");
        skillsRepo.save(skills16);
        Skills skills17 = new Skills("Knowledge");
        skillsRepo.save(skills17);
        Skills skills18 = new Skills("Listen");
        skillsRepo.save(skills18);
        Skills skills19 = new Skills("Move Silently");
        skillsRepo.save(skills19);
        Skills skills20 = new Skills("Perform");
        skillsRepo.save(skills20);
        Skills skills21 = new Skills("Profession");
        skillsRepo.save(skills21);
        Skills skills22 = new Skills("Ride");
        skillsRepo.save(skills22);
        Skills skills23 = new Skills("Search");
        skillsRepo.save(skills23);
        Skills skills24 = new Skills("Sense Motive");
        skillsRepo.save(skills24);
        Skills skills25 = new Skills("Sleight Of Hand");
        skillsRepo.save(skills25);
        Skills skills26 = new Skills("Speak Language");
        skillsRepo.save(skills26);
        Skills skills27 = new Skills("Spellcraft");
        skillsRepo.save(skills27);
        Skills skills28 = new Skills("Spot");
        skillsRepo.save(skills28);
        Skills skills29 = new Skills("Survival");
        skillsRepo.save(skills29);
        Skills skills30 = new Skills("Swim");
        skillsRepo.save(skills30);
        Skills skills31 = new Skills("Tumble");
        skillsRepo.save(skills31);
        Skills skills32 = new Skills("Use Magic Device");
        skillsRepo.save(skills32);
        Skills skills33 = new Skills("Use Rope");
        skillsRepo.save(skills33);
    }
}
