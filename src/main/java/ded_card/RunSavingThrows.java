package ded_card;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class RunSavingThrows {

    private SavingThrowsRepo savingThrowsRepo;

    @Autowired
    public RunSavingThrows(SavingThrowsRepo savingThrowsRepo){
        this.savingThrowsRepo = savingThrowsRepo;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void runSavingThrows(){
        SavingThrows savingThrows1 = new SavingThrows("high",2.5,0.5);
        savingThrowsRepo.save(savingThrows1);
        SavingThrows savingThrows2 = new SavingThrows("low",0,0.5);
        savingThrowsRepo.save(savingThrows2);
    }
}