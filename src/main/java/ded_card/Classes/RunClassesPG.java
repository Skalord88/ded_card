package ded_card.Classes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import ded_card.Skills.Skills;
import ded_card.Skills.SkillsRepo;

@RestController
public class RunClassesPG {

    private ClassesPGRepo classesPGRepo;
    private SkillsRepo skillsRepo;

    @Autowired
    public RunClassesPG(ClassesPGRepo classesPGRepo, SkillsRepo skillsRepo){
        this.classesPGRepo=classesPGRepo;
        this.skillsRepo=skillsRepo;
    }

    @GetMapping("pgCl")
    public void runClassesPG(){
        Skills skill1 = skillsRepo.findByName("Climb");
        ClassesPG barbarian = new ClassesPG();
        barbarian.setSkills(skill1);
        this.classesPGRepo.save(barbarian);

    }
    
}
