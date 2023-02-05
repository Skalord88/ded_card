package ded_card;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class RunForRefWill {
    
    private ForRefWillRepo forRefWillRepo;

    @Autowired
    public RunForRefWill(SavingThrowsRepo savingThrowsRepo){
        this.forRefWillRepo = forRefWillRepo;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void runForRefWill(){
        ForRefWill forRefWill1 = new ForRefWill("Fortitude");
        forRefWillRepo.save(forRefWill1);
        ForRefWill forRefWill2 = new ForRefWill("Reflex");
        forRefWillRepo.save(forRefWill2);
        ForRefWill forRefWill3 = new ForRefWill("Will");
        forRefWillRepo.save(forRefWill3);
    }
}