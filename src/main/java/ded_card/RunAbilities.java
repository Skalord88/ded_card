package ded_card;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class RunAbilities {
    
    private AbilitiesRepo abilitiesRepo;

    @Autowired
    public RunAbilities(AbilitiesRepo abilitiesRepo){
        this.abilitiesRepo = abilitiesRepo;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void runAbilities(){
        Abilities abilities1 = new Abilities("Strenght");
        abilitiesRepo.save(abilities1);
        Abilities abilities2 = new Abilities("Dextrities");
        abilitiesRepo.save(abilities2);
        Abilities abilities3 = new Abilities("Constitution");
        abilitiesRepo.save(abilities3);
        Abilities abilities4 = new Abilities("Intelligence");
        abilitiesRepo.save(abilities4);
        Abilities abilities5 = new Abilities("Wisdom");
        abilitiesRepo.save(abilities5);
        Abilities abilities6 = new Abilities("Charisma");
        abilitiesRepo.save(abilities6);
    }
}
